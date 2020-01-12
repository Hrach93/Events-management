import { Component, OnInit } from '@angular/core';
import { EventsService } from '../shared/services/events.service';
import {EventsType, Event} from '../../shared/interfaces';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  events: Event[]
  types: EventsType[]
  constructor(private eventsService: EventsService) { }

  ngOnInit() {

    this.eventsService.getTypes().subscribe((types: EventsType[]) => {
      this.eventsService.getAll().subscribe((events: Event[]) => {
        console.log(types);
        console.log(events);
        this.types = types;
        this.events = events;
      });

    });

  }

}
