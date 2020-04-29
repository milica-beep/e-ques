import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { Subject } from 'src/app/models/subject';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {
  currentUser: User;
  subjectId: number;
  subject: Subject;

  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.userService.userLogged.subscribe(user => {
      this.currentUser = user;
    })

    this.activatedRoute.paramMap.subscribe(params => {
      this.subjectId = parseInt(params.get('id'));

      this.userService.getSubject(this.subjectId).subscribe(subject => {
        this.subject = subject;
      })
    })
  }

}
