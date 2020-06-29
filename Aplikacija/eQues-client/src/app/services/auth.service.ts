import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../models/User';
import { RegistrationModel } from '../models/registrationModel';
import { Constants } from '../constants';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  serverUrl:string = Constants.serverUrl;
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

  currentUser() {
    return this.http.get<any>(this.serverUrl + 'auth/current-user');
  }

  // sharing data between app component and login component

  private emitChangeSource = new Subject<any>();

  changeEmitted$ = this.emitChangeSource.asObservable();

  emitChange(change: any) {
    this.emitChangeSource.next(change);
  }

  verifyEmail(token: any) {
    console.log(token);
    return this.http.post(this.serverUrl + 'auth/verify-email', token);
  }

}
