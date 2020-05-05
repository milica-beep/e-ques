import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter()
  @Output() userLoggedOut: EventEmitter<any> = new EventEmitter()
  user: User;
  userId: string;

  constructor(private userService: UserService,
              private authService: AuthService)
              { }

  ngOnInit(): void {
    this.authService.emitChange('');

    this.userService.userLogged.subscribe(user => {
      this.user = user;
    })
  }

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

  logOut() {
    this.userLoggedOut.emit();
  }

}
