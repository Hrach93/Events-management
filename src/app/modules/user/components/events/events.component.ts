import { Component, OnInit } from '@angular/core';
import { EventsType, Event } from '../../../../interfaces/interfaces';
import { EventsService } from '../../../../services/events.service';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  public events: Event[];
  public types: EventsType[];
  public openModal = false;
  public eventData: Event;
  public totalItems: number;
  public isAdminUser: boolean;
  public currentPage = 1;
  public perPageItems = 10;
  public imageURL = 'https://volo-test.herokuapp.com/image';

  constructor(
    private eventsService: EventsService,
    private authService: AuthService, // @TODO must be singleton
  ) {

  }

  ngOnInit() {
    this.getEvents();
    this.isAdminUser = JSON.parse(localStorage.getItem('user')).isAdmin;
  }

  public getEvents() {
    this.eventsService.getTypes().subscribe((types) => {
      this.types = types['body'];
      this.getAllEvents();
    });
  }

  public getAllEvents(page = this.currentPage, limit = this.perPageItems) {
    this.eventsService.getAll(page, limit).subscribe(res => {
      this.events = res['body'];
      this.totalItems = res['headers'].get('X-Total-Count');
    });
  }

  public edit(event) {
    this.eventData = event;
    this.openModal = true;
  }

  public pageChange(page) {
    this.getAllEvents(page);
  }

  public edited() {
    this.openModal = false;
    this.getEvents();
  }

  public closeModal() {
    this.openModal = false;
  }

  public delete(event: Event, index: number) {
    this.eventsService.deleteEvent(event.id).subscribe(res => {
      this.events.splice(index, 1);
    });
  }
}
