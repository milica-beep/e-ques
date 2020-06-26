import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  moduleName: String;

  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.authService.emitChange('');

    this.activatedRoute.paramMap.subscribe(params => {
      this.userId = parseInt(params.get('id'));

      if(this.currentUser != undefined) { // Korisnik se sa necijeg profila vraca na svoj (ili neki drugi), podaci moraju ponovo da se pribave
        this.checkUser();
      }
    })

    this.userService.userLogged.subscribe(user => {
      this.currentUser = user;

      this.checkUser();
    })

    // this.router.events.subscribe(event => {
    //   console.log('router event user prof komp');
    //   this.activatedRoute.paramMap.subscribe(params => {
    //     this.userId = parseInt(params.get('id'));
    //     console.log('user id: ' + this.userId);
    //   })

    //   if(this.userId != this.currentUser?.id) {
    //     this.getUserData();
    //     console.log('razlicito');
    //   }
    //   else {
    //     this.user = this.currentUser;
    //     console.log('isto ');
    //   }
    // })
  }

  getUserData() {
    this.userService.getUserData(this.userId).subscribe(resp => {
      this.user = resp['user'];
      if (this.currentUser.roleId == 1) {
        this.moduleName = resp['moduleName'];
      }
    })
  }

  checkUser() {
    if(this.userId != this.currentUser?.id) {
      this.getUserData();
    }
    else {
      this.userId = this.currentUser.id;
      this.getUserData();
      //this.user = this.currentUser;
    }
  }

}
