import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';
import { Subject } from 'src/app/models/subject';
import { Question } from 'src/app/models/question';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  users: User[];
  subjects: Subject[];
  questions: Question[];

  usersFound: boolean = false;
  subjectsFound: boolean = false;
  questionsFound: boolean = false;

  imagePath: String;

  constructor(private userService: UserService) {
    this.userService.searchFinished.subscribe(
      searchData => {
        this.users = searchData['users'];
        this.subjects = searchData['subjects'];
        this.questions = searchData['questions'];

        console.log(searchData);

        if(this.users != undefined) {
          this.usersFound = true;
        }

        if(this.subjects != undefined) {
          this.subjectsFound = true;
        }

        if(this.questions != undefined) {
          this.questionsFound = true;
        }
      }
    )
  }

  ngOnInit(): void {
    this.imagePath = 'http://127.0.0.1:5000/static/images/user_images/';
  }

}
