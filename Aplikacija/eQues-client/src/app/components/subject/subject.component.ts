import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/User';
import { Subject } from 'src/app/models/subject';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SubjectService } from 'src/app/services/subject.service';
import { Topic } from 'src/app/models/topic';
import { AuthService } from 'src/app/services/auth.service';
import { Question } from 'src/app/models/question';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']

})

export class SubjectComponent implements OnInit {
  currentUser: User;
  subjectId: number;
  subject: Subject;
  topics: Topic[];
  questions: Question[];
  clicked: boolean = false;

  constructor(private userService: UserService,
              private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private subjectService: SubjectService,
              private questionService: QuestionService,
              private router: Router) { }

  ngOnInit(): void {
    this.authService.emitChange('');

    this.userService.userLogged.subscribe(user => {
      this.currentUser = user;
    })

    this.activatedRoute.paramMap.subscribe(params => {
      this.subjectId = parseInt(params.get('id'));

      this.getSubject();
    })
  }

  getSubject() {
    this.subjectService.getSubject(this.subjectId).subscribe(resp => {
      this.subject = resp.subject;
      this.topics = resp.topics;
    })
  }

  getTopics() {
    this.subjectService.getTopics(this.subjectId).subscribe(topics => {
      this.topics = topics.topics;
    })
  }

  getQuestions(topicId: number) {
    this.subjectService.getQuestions(topicId).subscribe(
    resp => {
      this.questions = resp.questions;
    },
    err => {
      this.questions = null;
    })
  }

  emitQuestionData(topicId: number) {
    // let data = {
    //   'userId': this.currentUser?.id,
    //   'topicId': topicId
    // };

    // let question = new Question()
    // question.topicId = topicId;
    // question.userId = this.currentUser.id;

    // console.log(question);

    // this.questionService.emitQuestionData(question);

    this.questionService.topicId = topicId;
  }

  test(topicId) {
    this.router.navigate(['AddQuestionComponent', {id: topicId, id2: this.subjectId}]);
  }
}
