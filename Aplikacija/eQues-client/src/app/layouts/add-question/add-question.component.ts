import { Component, OnInit, Input } from '@angular/core';
import { Question } from 'src/app/models/question';
import { QuestionService } from 'src/app/services/question.service';
import { FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})

// TODO : make this component subscribe to get user data and put topic id/name in the url
// OR put the topic id and user id variables in question service, change them on click from subject component
// and access them from here
// That can be changed globaly in the app, maybe its a better solution than subscribing to events

export class AddQuestionComponent implements OnInit {
  question: Question;
  currentUser: User;

  questionForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private questionService: QuestionService,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private userService: UserService) {
              }

  ngOnInit(): void {
    this.authService.emitChange('');

    this.userService.userLogged.subscribe(user => {
      this.currentUser = user;
    })

    this.question = new Question();

    this.activatedRoute.paramMap.subscribe(params => {
      this.question.topicId = parseInt(params.get('id'))
    })

    this.questionForm = this.formBuilder.group({
      title: ['', Validators.required],
      text: ['', Validators.required]
    });
  }

  get f() { return this.questionForm.controls; }

  onSubmit() {
    if(this.questionForm.invalid) {
      this.getFormValidationErrors();
      return;
    }

    this.question.userId = this.currentUser.id;
    this.question.title = this.questionForm.get('title').value;
    this.question.text = this.questionForm.get('text').value;

    console.log(this.currentUser.id);
    console.log(this.question.topicId);
    this.questionService.postQuestion(this.question).subscribe(
      message => {
        console.log(message);
      },
      error => {
        console.log(error);
      }
    )
  }

  getFormValidationErrors() {
    Object.keys(this.questionForm.controls).forEach(key => {

    const controlErrors: ValidationErrors = this.questionForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
          });
        }
      });
    }
}
