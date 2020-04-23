import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { User } from '../models/User'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class UserService {
  userUrl:string = ' http://127.0.0.1:5000/register';
  constructor(private http:HttpClient) { }

  //getUsers():Observable<User[]> {
  //  return this.http.get<User[]>(this.userUrl+'users/test-server');
 // }

  addUser(user:User):Observable<User> {
    return this.http.post<User>(this.userUrl, user, httpOptions);
  }

}
