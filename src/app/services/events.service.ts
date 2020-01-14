import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class EventsService extends CommonService {

  public createEvent(event) {
    return this.post('events', event);
  }

  public getAll(page, limit) {
    return this.get(`events?_page=${page}&limit=${limit}`);
  }

  public getTypes() {
    return this.get('eventTypes');
  }

  public uploadImage(id: number, imgData) {
    return this.post('image-upload/' + id, imgData);
  }

  public editEvent(id: number, data) {
    return this.put(`events/${id}`, data);
  }

  public deleteEvent(id: number) {
    return this.delete(`events/${id}`);
  }

}
