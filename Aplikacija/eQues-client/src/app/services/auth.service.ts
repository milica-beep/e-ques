import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../models/User';
import { RegistrationModel } from '../models/registrationModel';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  serverUrl:string = ' http://127.0.0.1:5000/';
  constructor(private http: HttpClient) { }

  private handleError(error: any) {
    return Observable.throw(error);
  }

  public getToken(): string {
    return localStorage.getItem('accessToken');
  }

  public isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getRegistrationData():Observable<RegistrationModel> {
    return this.http.get<RegistrationModel>(this.serverUrl + 'auth/get-registration-data');
  }

  register(user:User) {
    return this.http.post(this.serverUrl + 'auth/register', user);
  }

  login(email:string, password:string) {
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
