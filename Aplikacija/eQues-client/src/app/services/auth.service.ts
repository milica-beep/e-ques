import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


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

  login(username:string, password:string):Observable<{}> {
    return this.http.post<any>(this.serverUrl+'login', {username: username,password: password})
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
