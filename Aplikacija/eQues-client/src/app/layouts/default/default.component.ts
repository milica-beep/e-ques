import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.userLogged.subscribe(user => {
      this.isLoggedIn = true;
    },
    err => {
      this.isLoggedIn = false;
    })
  }

}
