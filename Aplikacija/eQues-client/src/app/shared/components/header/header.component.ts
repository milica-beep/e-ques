import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter()
  user: User;
  userId: string;

  constructor(private userService: UserService)
              { }

  ngOnInit(): void {
    this.userService.userLogged.subscribe(user => {
      this.user = user;
    })
  }

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    // setTimeout(() => {
    //   window.dispatchEvent(
    //     new Event('resize')
    //   );
    // },300);
  }

}
