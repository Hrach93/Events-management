import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class CommonService {

  private headers = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('T-token')
    }
  };

  private hostName = 'https://volo-test.herokuapp.com/';

  constructor(private http: HttpClient) {}

  public get(url: string) {
    return this.http.get(`${this.hostName}${url}`, this.headers);
  }

  public post(url: string, data?) {
    return this.http.post(`${this.hostName}${url}`, data, this.headers);
  }

  public put(url: string, data?) {
    return this.http.put(`${this.hostName}${url}`, data, this.headers);
  }

  public delete(url: string, data?) {
    return this.http.delete(`${this.hostName}${url}`, this.headers);
  }
}
