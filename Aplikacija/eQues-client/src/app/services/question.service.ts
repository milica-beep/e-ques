import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Question } from '../models/question';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  serverUrl: string = ' http://127.0.0.1:5000/';
  topicId: number;

  constructor(private http: HttpClient) { }

  private addQuestion = new Subject<any>();

  getQuestionData = this.addQuestion.asObservable();

  emitQuestionData(question: Question) {
    this.addQuestion.next(question);
  }

  postQuestion(question: Question) {
    return this.http.post(this.serverUrl + 'questions/add-question', question);
  }

  getDiscussion(questionId: number) {
    let params = new HttpParams().set("id", questionId.toString());
    return this.http.get<any>(this.serverUrl + 'discussion/get-discussion', {params:params});
  }
}
