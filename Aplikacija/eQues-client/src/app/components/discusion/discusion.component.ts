import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';
import { Question } from 'src/app/models/question';
import { Answer } from 'src/app/models/answer';
import { Comment } from 'src/app/models/comment';
import { QuestionService } from 'src/app/services/question.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-discusion',
  templateUrl: './discusion.component.html',
  styleUrls: ['./discusion.component.css']
})
export class DiscusionComponent implements OnInit {
  currentUser: User;
  question: Question;
  answers: Answer[];
  comments: Comment[];
  users: User[];

  constructor(private authService: AuthService,
              private userService: UserService,
              private questionService: QuestionService,
              private activatedRoute: ActivatedRoute,
              ) { }

  ngOnInit(): void {
    this.authService.emitChange('');

    this.userService.userLogged.subscribe(user => {
      this.currentUser = user;
    })

    this.question = new Question();

    this.activatedRoute.paramMap.subscribe(params => {
      this.question.id = parseInt(params.get('id'));
    })

    this.questionService.getDiscussion(this.question.id).subscribe(
      resp => {
        this.question = resp['question'];
        this.answers = resp['answers'];
        this.comments = resp['comments'];
        this.users = resp['users'];
      },
      err => {
        console.log(err);
      }
    );
  }

}
