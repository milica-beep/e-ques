import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter()
  @Output() userLoggedOut: EventEmitter<any> = new EventEmitter()
  currentUser: User;
  userId: string;

  searchForm: FormGroup;

  constructor(private userService: UserService,
              private authService: AuthService,
              private formBuilder: FormBuilder,
              private router: Router)
              { }

  ngOnInit(): void {
    this.authService.emitChange('');

    this.userService.userLogged.subscribe(user => {
      this.currentUser = user;
    })

    this.searchForm = this.formBuilder.group({
      search: ['', Validators.required],
      type: ['', Validators.required]
    })

    this.searchForm.controls['type'].setValue(1);
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

  search() {
    let searchFor = this.searchForm.get('search').value;
    let searchType = this.searchForm.get('type').value;

    console.log('search type ' + searchType);

    this.router.navigate(['/search-results', searchFor, searchType]);
  }

}
