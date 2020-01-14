import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../interfaces/interfaces';
import { CommonService } from './common.service';

@Injectable({providedIn: 'root'})
export class AuthService extends CommonService {

  public error$: Subject<string> = new Subject<string>();
  public isAdmin = false;

  get token(): string {
    return localStorage.getItem('T-token');
  }

  login(user: User): Observable<any> {
    user.returnSecureToken = true;
    return this.post('login', user)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this))
      );
  }

  logout() {
    localStorage.clear();
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private handleError(error: HttpErrorResponse) {
    const {message} = error.error;
    this.error$.next(message);
    return throwError(error);
  }

  private setToken(response) {
    response = response && response['body'];
    if (response) {
      localStorage.setItem('T-token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
    } else {
      localStorage.clear();
    }
  }
}
