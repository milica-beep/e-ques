import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { Subject } from 'src/app/models/subject';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SubjectService } from 'src/app/services/subject.service';
import { Topic } from 'src/app/models/topic';
import { AuthService } from 'src/app/services/auth.service';

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

  constructor(private userService: UserService,
              private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private subjectService: SubjectService,
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

    //this.getTopics();

    this.router.events.subscribe(event => {
      this.getTopics();
    })
  }

  getSubject() {
    this.subjectService.getSubject(this.subjectId).subscribe(subject => {
      this.subject = subject;
    })
  }

  getTopics() {
    this.subjectService.getTopics(this.subjectId).subscribe(topics => {
      this.topics = topics.topics;
    })
  }

}
