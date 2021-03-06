import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from '../models/subject';
import { Constants } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  serverUrl:string = Constants.serverUrl;

  constructor(private http: HttpClient) { }

  getProfsSubj() {
    return this.http.get<any>(this.serverUrl + 'admin/get-profs-subj');
  }

  addSubjectToProfessor(data) {
    return this.http.post(this.serverUrl + 'admin/post-profs-subj', data);
  }

  getUnapprovedProfessors() {
    return this.http.get<any>(this.serverUrl + 'admin/get-unapproved-professors');
  }

  approveProfessor(profId: number) {
    let params = new HttpParams().set("id", profId.toString());
    return this.http.get<any>(this.serverUrl + 'admin/approve-professor', {params:params});
  }

  addSubject(subject: Subject) {
    return this.http.post(this.serverUrl + 'admin/add-subject', subject);
  }

  getAddSubjectData() {
    return this.http.get<any>(this.serverUrl + 'admin/get-add-subject-data');
  }

  getSubjects() {
    return this.http.get(this.serverUrl + 'admin/get-subjects');
  }

  deleteSubject(subjectId: number) {
    let params = new HttpParams().set("id", subjectId.toString());
    return this.http.delete<any>(this.serverUrl + 'admin/delete-subject', {params:params});
  }

  addTopic(data: any) {
    return this.http.post(this.serverUrl + 'admin/add-topic', data);
  }

  getAllUsers() {
    return this.http.get(this.serverUrl + 'admin/get-all-users');
  }

  deleteUser(userId: number) {
    let params = new HttpParams().set("id", userId.toString());
    return this.http.delete<any>(this.serverUrl + 'admin/delete-user', {params:params});
  }
}
