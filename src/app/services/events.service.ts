import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({providedIn: 'root'})
export class EventsService extends CommonService {

  public createEvent(event) {
    return this.post('events', event);
  }

  public getAll(page = 1, limit = 10) {
    return this.get(`events?_page=${page}&limit=${limit}`);
  }

  public getTypes() {
    return this.get('eventTypes');
  }

  public editEvent(id: number, data) {
    return this.put(`events/${id}`, data);
  }

  public deleteEvent(id: number) {
    return this.delete(`events/${id}`);
  }

}
