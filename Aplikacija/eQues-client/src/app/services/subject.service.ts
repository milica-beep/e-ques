import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  serverUrl:string = ' http://127.0.0.1:5000/';

  constructor(private http:HttpClient) { }

  getSubject(subjectId:number) {
    let params = new HttpParams().set("id", subjectId.toString());
    return this.http.get<any>(this.serverUrl + 'subjects/get-subject', {params: params});
  }

  getTopics(subjectId:number) {
    let params = new HttpParams().set("id", subjectId.toString());
    return this.http.get<any>(this.serverUrl + 'subjects/get-topics', {params:params});
  }

  getQuestions(topicId:number) {
    let params = new HttpParams().set("id", topicId.toString());
    return this.http.get<any>(this.serverUrl + 'subjects/get-questions', {params:params});
  }
}
