import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  serverUrl:string = ' http://127.0.0.1:5000/';

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
}
