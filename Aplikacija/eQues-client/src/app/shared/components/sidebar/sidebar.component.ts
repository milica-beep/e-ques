import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';
import { Subject } from 'src/app/models/subject';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
// TODO nemoj da ostane fiksna sirina u css!!!!
export class SidebarComponent implements OnInit {
  user: User;
  userSubjects: Subject[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.userLogged.subscribe(user => {
      this.user = user;

      this.userService.getSubjects(this.user.id).subscribe(subjects => {
        this.userSubjects = subjects.subjects;
        console.log(subjects['subjects']);
      })
    })
  }

}
