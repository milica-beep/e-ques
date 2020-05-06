import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
// TODO viewing other users' profile
export class UserProfileComponent implements OnInit {
  userId: number;
  currentUser: User;
  user: User;

  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.emitChange('');

    this.activatedRoute.paramMap.subscribe(params => {
      this.userId = parseInt(params.get('id'));
    })

    this.userService.userLogged.subscribe(user => {
      this.currentUser = user;

      if(this.userId != this.currentUser?.id) {
        this.getUserData();
      }
    })
  }

  getUserData() {
    this.userService.getUserData(this.userId).subscribe(user => {
      this.user = user;
      console.log(user.name);
    })
  }

}
