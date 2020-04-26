import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../models/User';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  serverUrl:string = ' http://127.0.0.1:5000/';
  constructor(private http: HttpClient) { }

  public getToken(): string {
    return localStorage.getItem('accessToken');
  }
  public isAuthenticated(): boolean {
    return !!this.getToken();
  }

  register(user:User):Observable<{}> {
    return this.http.post<User>(this.serverUrl + 'auth/register', user);
  }

  login(email:string, password:string):Observable<{}> {
    return this.http.post<any>(this.serverUrl+'/auth/login', {email: email, password: password})
    .pipe(map(response => {

      localStorage.setItem('accessToken', response.access_token);
      return response;
    }))
  }

  logout() {
    this.http.get<any>(this.serverUrl+'logout').pipe(map(response => {
      localStorage.removeItem('accessToken');
      return response;
    }));
  }

  test() {
    return this.http.get<any>(this.serverUrl+'test');
  }


}
