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
  userId: string;
  currentUser: User;

  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private authService: AuthService) { }

  ngOnInit(): void {
    // this.userService.userLogged.subscribe(user => {
    //   this.currentUser = user;
    //   console.log(this.currentUser.name)
    // })

    this.activatedRoute.paramMap.subscribe(params => {
      this.userId = params.get('id');
    })

    this.authService.currentUser().subscribe(user => {
      this.currentUser = user;
      this.userService.emitUserData(this.currentUser); // header ne dobija informacije bez ovoga/;>?
    })

  }

}
