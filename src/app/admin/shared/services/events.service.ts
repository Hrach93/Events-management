import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class EventsService {

  headers = {
   Authorization: 'Bearer ' + localStorage.getItem('T-token')
  };

  constructor(private http: HttpClient) {}

  createEvent(event) {
    return this.http.post('https://volo-test.herokuapp.com/events', event,{
      headers: this.headers
    });
  }

  getAll() {
    return this.http.get('https://volo-test.herokuapp.com/events',{
      headers: this.headers
      });
  }

  getTypes() {
    return this.http.get('https://volo-test.herokuapp.com/eventTypes',{
      headers: this.headers
    });
  }

}
