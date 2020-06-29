import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';
import { Subject } from 'src/app/models/subject';
import { Question } from 'src/app/models/question';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  users: User[];
  subjects: Subject[];
  questions: Question[];

  searchFor: string;
  searchBy: string;

  usersFound: boolean = false;
  subjectsFound: boolean = false;
  questionsFound: boolean = false;

  imagePath: String;

  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute,) {

    // this.userService.searchFinished.subscribe(
    //   searchData => {
    //     this.users = searchData['users'];
    //     this.subjects = searchData['subjects'];
    //     this.questions = searchData['questions'];

    //     console.log(searchData);

    //     if(this.users != undefined) {
    //       this.usersFound = true;
    //     }

    //     if(this.subjects != undefined) {
    //       this.subjectsFound = true;
    //     }

    //     if(this.questions != undefined) {
    //       this.questionsFound = true;
    //     }
    //   }
    // )
  }

  ngOnInit(): void {
    this.imagePath = 'http://127.0.0.1:5000/static/images/user_images/';

    this.activatedRoute.paramMap.subscribe(params => {
      this.searchBy = params.get('searchBy');
      this.searchFor = params.get('searchFor');

      console.log('search for ' + this.searchFor + ' search by ' + this.searchBy);

      if(this.searchFor == '1') {
          this.userService.searchUsers(this.searchBy).subscribe(
            response => {
              this.users = response['users'];
              this.subjects = this.questions = null;
            },
            error => {
              console.log(error);
            }
          )
        }
        if(this.searchFor == '2') {
          this.userService.searchSubjects(this.searchBy).subscribe(
            response => {
              this.subjects = response['subjects'];
              this.users = this.questions = null;
            },
            error => {
              console.log(error);
            }
          )
        }
        if(this.searchFor == '3') {
          this.userService.searchQuestions(this.searchBy).subscribe(
            response => {
              this.questions = response['questions'];
              this.users = this.subjects = null;
            },
            error => {
              console.log(error);
            }
          )
        }
    })
  }

}
