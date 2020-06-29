import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { Question } from 'src/app/models/question';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: User;
  questions: Question[];

  constructor(private authService: AuthService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.authService.emitChange('');
    this.userService.userLogged.subscribe(user => {
      this.currentUser = user;
    })

    this.userService.getHomePageData().subscribe(
      response => {
        this.questions = response['questions'];
      }
    )

  }

  test():void {
    this.authService.emitChange('Check');
  }

}
