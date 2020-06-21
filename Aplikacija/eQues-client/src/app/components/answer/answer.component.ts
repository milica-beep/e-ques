import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';
import { Question } from 'src/app/models/question';
import { QuestionService } from 'src/app/services/question.service';
import { Answer } from 'src/app/models/answer';
import { Comment } from 'src/app/models/comment';
import { Location } from '@angular/common';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {
  newAnswer: Answer;
  question: Question;
  userPosted: User;
  currentUser: User;
  newComment: Comment;
  answer: Answer;

  showOnPage: String;

  form: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private authService: AuthService,
              private userService: UserService,
              private questionService: QuestionService,
              private location: Location
              ) { }

  ngOnInit(): void {
    this.authService.emitChange('');

    this.userService.userLogged.subscribe(user => {
      this.currentUser = user;
    })

    this.question = new Question();
    this.answer = new Answer();

    this.newAnswer = new Answer();
    this.newComment = new Comment();

    if(this.activatedRoute.toString().includes("Route(url:'answer', path:'answer')")) {
      console.log('postoji pitanje id ' + this.question.id);

      this.activatedRoute.parent.paramMap.subscribe(params => {
        console.log('naziv rute: ' + this.activatedRoute.toString());
        this.question.id = parseInt(params.get('questionId'));
        console.log('ques id: ' + this.question.id);
      });

      this.questionService.getQuestion(this.question.id).subscribe(
        resp => {
          this.question = resp['question'];
          this.userPosted = resp['userAsking'];

          this.showOnPage = this.question.text;
          console.log(this.question.text);
        },
        err => {
          console.log(err);
        }
      );
    }
    else {
      console.log('postoji answer id ' + this.answer.id);

      this.activatedRoute.paramMap.subscribe(params => {
        console.log('naziv rute 2: ' + this.activatedRoute.toString());
        this.answer.id = parseInt(params.get('answerId'));
      })

      this.questionService.getAnswer(this.answer.id).subscribe(
        resp => {
          this.answer = resp['answer'];
          this.userPosted = resp['userAsking'];

          this.showOnPage = this.answer.text;

          console.log(this.answer.text);
        },
        err => {
          console.log(err);
        }
      )
    }

    this.form = this.formBuilder.group({
      text: ['', Validators.required]
    });
  }

  get f() { return this.form.controls; }

  onSubmit() {
    if(this.form.invalid) {
      this.getFormValidationErrors();
      return;
    }

    if(this.activatedRoute.toString().includes("Route(url:'answer', path:'answer')")) {
      this.newAnswer.questionId = this.question.id;
      this.newAnswer.userId = this.currentUser.id;
      this.newAnswer.text = this.form.get('text').value;

      this.questionService.postAnswer(this.newAnswer).subscribe(
        message => {
          console.log(message);
          this.location.back();
        },
        error => {
          console.log(error);
        }
      );
    }
    else {
      this.newComment.answerId = this.answer.id;
      this.newComment.userId = this.currentUser.id;
      this.newComment.text = this.form.get('text').value;

      this.questionService.postComment(this.newComment).subscribe(
        message => {
          console.log(message);
          this.location.back();
        },
        error => {
          console.log(error);
        }
      );
    }

  }

  getFormValidationErrors() {
    Object.keys(this.form.controls).forEach(key => {

    const controlErrors: ValidationErrors = this.form.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
          });
        }
      });
    }

}
