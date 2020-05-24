import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Question } from '../models/question';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  serverUrl:string = ' http://127.0.0.1:5000/';
  constructor(private http: HttpClient) { }

  private addQuestion = new Subject<any>();

  getQuestionData = this.addQuestion.asObservable();

  emitQuestionData(question: Question) {
    this.addQuestion.next(question);
  }

  postQuestion(question: Question) {
    return this.http.post(this.serverUrl + 'questions/add-question', question);
  }
}
