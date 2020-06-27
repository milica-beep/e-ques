import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { User } from '../models/User'
import { Consultation } from '../models/consultation';
import { Constants } from '../constants';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  serverUrl:string = Constants.serverUrl;
  constructor(private http:HttpClient) { }

  //getUsers():Observable<User[]> {
  //  return this.http.get<User[]>(this.userUrl+'users/test-server');
 // }

  private userLoggedIn = new Subject<any>();
  userLogged = this.userLoggedIn.asObservable();
  emitUserData(user: User) {
    this.userLoggedIn.next(user);
  }

  getSubjects(userId:number) {
    let params = new HttpParams().set('id', userId.toString());
    return this.http.get<any>(this.serverUrl + 'users/get-subjects', {params: params});
  }

  getUserData(userId:number) {
    let params = new HttpParams().set('id', userId.toString());
    return this.http.get<any>(this.serverUrl + 'users/get-user', {params: params});
  }

  addConsultation(consultation: Consultation) {
    return this.http.post(this.serverUrl + 'users/add-consultation', consultation);
  }

  deleteConsultation(consultationId: number) {
    let params = new HttpParams().set("id", consultationId.toString());
    return this.http.delete<any>(this.serverUrl + 'users/delete-consultation', {params:params});
  }

  signForConsultation(data) {
    return this.http.post(this.serverUrl + 'users/sign-for-consultation', data);
  }

  getEditUserData(userId:number) {
    let params = new HttpParams().set('id', userId.toString());
    return this.http.get<any>(this.serverUrl + 'users/get-edit-user-data', {params: params});
  }

  changePassword(data: any) {
    return this.http.post(this.serverUrl + 'users/change-password', data);
  }

  updateUserData(user: User) {
    return this.http.post(this.serverUrl + 'users/update-user-data', user);
  }

  uploadFile(file: File, userId: number) {
    const formData = new FormData();

    formData.append('file', file);
    formData.set('userId', userId.toString());

    return this.http.post(this.serverUrl + 'users/file-upload', formData);
  }
}
