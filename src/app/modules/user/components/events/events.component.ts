import { Component, OnInit } from '@angular/core';
import { EventsType, Event } from '../../../../interfaces/interfaces';
import { EventsService } from '../../../../services/events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  public events: Event[] = [];
  public types: EventsType[];
  public openModal = false;
  public eventData: Event;

  constructor(private eventsService: EventsService) {

  }

  ngOnInit() {
    this.getEvents();
  }

  public getEvents() {
    this.eventsService.getTypes().subscribe((types: EventsType[]) => {
      this.eventsService.getAll().subscribe((events: Event[]) => {
        console.log(events, 'cccccccccccccc');
        
        this.types = types;
        this.events = events;
      });

    });
  }
  public edit(event) {
    this.eventData = event;
    this.openModal = true;
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
