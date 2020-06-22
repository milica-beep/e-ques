import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Question } from '../models/question';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Answer } from '../models/answer';
import { Comment } from '../models/comment';

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

  getQuestion(questionId: number) {
    let params = new HttpParams().set("id", questionId.toString());
    return this.http.get<any>(this.serverUrl + 'questions/get-question', {params:params});
  }

  postQuestion(question: Question) {
    return this.http.post(this.serverUrl + 'questions/add-question', question);
  }

  getDiscussion(questionId: number) {
    let params = new HttpParams().set("id", questionId.toString());
    return this.http.get<any>(this.serverUrl + 'discussion/get-discussion', {params:params});
  }

  getAnswer(answerId: number) {
    let params = new HttpParams().set("id", answerId.toString());
    return this.http.get<any>(this.serverUrl + 'discussion/get-answer', {params:params});
  }

  postAnswer(answer: Answer) {
    return this.http.post(this.serverUrl + 'discussion/add-answer', answer);
  }

  postComment(comment: Comment) {
    return this.http.post(this.serverUrl + 'discussion/add-comment', comment);
  }

  deleteComment(commentId: number) {
    let params = new HttpParams().set("id", commentId.toString());
    return this.http.delete<any>(this.serverUrl + 'discussion/delete-comment', {params:params});
  }
}
