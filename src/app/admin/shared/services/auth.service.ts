import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {User} from '../../../shared/interfaces';
import {Observable, Subject, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

@Injectable()
export class AuthService {

  public error$: Subject<string> = new Subject<string>()

  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('T-token');
  }



  login(user: User): Observable<any>{
    user.returnSecureToken = true;
    return this.http.post('https://volo-test.herokuapp.com/login', user)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this))
      );
  }

  logout() {
    this.setToken(null);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private handleError(error: HttpErrorResponse){
    const {message} = error.error;
    console.log(message);
    this.error$.next(message);
    return throwError(error);
  }

  private setToken(response) {
      if (response){
        localStorage.setItem('T-token', response.token)
        const {user} = response;
        localStorage.setItem('user', JSON.stringify({
          name: user.name,
          srName: user.srName,
          isAdmin: user.isAdmin
        }))
        console.log('response', response);
      } else{
        localStorage.clear();
      }}

}
