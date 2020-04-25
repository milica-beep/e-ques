import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { User } from '../models/User'

@Injectable({
  providedIn: 'root'
})

export class UserService {
  serverUrl:string = ' http://127.0.0.1:5000/';
  constructor(private http:HttpClient) { }

  //getUsers():Observable<User[]> {
  //  return this.http.get<User[]>(this.userUrl+'users/test-server');
 // }

  

}
