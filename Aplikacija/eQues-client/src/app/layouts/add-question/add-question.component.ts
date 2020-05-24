import { Component, OnInit, Input } from '@angular/core';
import { Question } from 'src/app/models/question';
import { QuestionService } from 'src/app/services/question.service';
import { FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})

// TODO : make this component subscribe to get user data and put topic id/name in the url
// OR put the topic id and user id variables in question service, change them on click from subject component
// and access them from here
// That can be change globaly in the app, maybe its a better solution than subscribing to events

export class AddQuestionComponent implements OnInit {
  question: Question;
  topicId: number;
  userId: number;
  loaded: boolean = false;

  questionForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private questionService: QuestionService) {
              }

  ngOnInit(): void {
    this.question = new Question();

    this.questionForm = this.formBuilder.group({
      title: ['', Validators.required],
      text: ['', Validators.required],
    });

    this.questionService.getQuestionData.subscribe(question => {
      this.question = question;
      console.log("brrrrrrrr " + this.question.topicId);
      this.loaded = true;
    });

    if(this.loaded) {
      console.log(this.question);
    }


  }

  get f() { return this.questionForm.controls; }

  onSubmit() {
    if(this.questionForm.invalid) {
      this.getFormValidationErrors();
      return;
    }

    this.question.topicId = this.topicId;
    this.question.userId = this.userId;
    this.question.title = this.questionForm.get('title').value;
    this.question.text = this.questionForm.get('text').value;

    console.log(this.topicId);

    // this.questionService.postQuestion(this.question).subscribe(
    //   message => {
    //     console.log(message);
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // )
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

  testClick() {
    console.log(this.loaded);
  }
}
