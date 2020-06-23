import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from './services/user.service';
import { User } from './models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'eQues';
  isLoggedIn: boolean = false;
  sideBarOpen = false;
  currentUser: User;
  adminLogged: boolean = false;

  constructor(private authService: AuthService,
              private router: Router,
              private snackBar: MatSnackBar,
              private userService: UserService
              ) {

    authService.changeEmitted$.subscribe( text => {
      this.checkUser();
    })
  }

  ngOnInit(): void {
    // loading
    this.authService.currentUser().subscribe(
      response => {
        console.log('Pozvana je ngOnInit');
        this.currentUser = response;

        this.userService.emitUserData(response); // proveri da li radi bez ovoga

        this.router.events.subscribe(event => {
          this.sideBarOpen = false; // da ne bi ostala otvorena kad kliknes na predmet iz liste
        })
        if(window.location.pathname == '/') { // ako je user ulogovan a pokusa da se vrati na pocetnu stranu
          this.router.navigate(['/home']);
        }
        if(response.roleId == 3 && !this.adminLogged) {
          this.adminLogged = true;
          this.router.navigate(['/admin']);
        }

        this.isLoggedIn = true;
      },
      error =>{
        this.isLoggedIn = false;
        this.sideBarOpen = false;
        this.router.navigate(['/']);
      })
  }

  checkUser() {
    this.authService.currentUser().subscribe(
      response => {
        this.router.events.subscribe(event => {
          this.sideBarOpen = false; // da ne bi ostala otvorena kad kliknes na predmet iz liste
        })
        this.userService.emitUserData(response);
        this.isLoggedIn = true;
        if(window.location.pathname == '/') { // ako je user ulogovan a pokusa da se vrati na pocetnu stranu
          if(response.roleId == 3 && !this.adminLogged) {
            this.adminLogged = true;
            this.router.navigate(['/admin']);
          }
          else {
            this.router.navigate(['/home']);
          }
        }
        // this.snackBar.open('Hi '+ response.name, 'OK', {
        //   duration: 2000,
        // });
      },
      error =>{
        this.isLoggedIn = false;
        this.sideBarOpen = false;
        this.snackBar.open('Morate biti ulogovani!', 'OK', {
          duration: 2000,
        });
        this.router.navigate(['']);
      })
  }

  sideBarToggler($event) {
    this.sideBarOpen = !this.sideBarOpen;
  }

  logUserOut($event) {
    this.isLoggedIn = false;
    this.sideBarOpen = false;
    this.adminLogged = false;
    this.router.navigate(['']);
    localStorage.clear();
  }
}
