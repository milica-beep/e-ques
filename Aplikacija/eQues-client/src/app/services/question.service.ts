import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Question } from '../models/question';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Answer } from '../models/answer';
import { Comment } from '../models/comment';
import { Constants } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  serverUrl:string = Constants.serverUrl;
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

  deleteAnswer(answerId: number) {
    let params = new HttpParams().set("id", answerId.toString());
    return this.http.delete<any>(this.serverUrl + 'discussion/delete-answer', {params:params});
  }

  pinAnswer(answer: Answer) {
    return this.http.post(this.serverUrl + 'discussion/pin-answer', answer);
  }

  gradeAnswer(data: any) {
    return this.http.post(this.serverUrl + 'discussion/grade-answer', data);
  }

  postComment(comment: Comment) {
    return this.http.post(this.serverUrl + 'discussion/add-comment', comment);
  }

  deleteComment(commentId: number) {
    let params = new HttpParams().set("id", commentId.toString());
    return this.http.delete<any>(this.serverUrl + 'discussion/delete-comment', {params:params});
  }
}
