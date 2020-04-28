import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'eQues';
  isLoggedIn: boolean = false;
  sideBarOpen = false;

  constructor(private authService: AuthService,
              private router: Router,
              private snackBar: MatSnackBar
              ) {

    authService.changeEmitted$.subscribe( text => {
      this.checkUser();
    })
  }

  ngOnInit(): void {
    // loading

    this.authService.currentUser().subscribe(
      response => {
        this.router.navigate(['/home']);
        this.isLoggedIn = true;
        console.log(this.isLoggedIn);
      },
      error =>{
        this.isLoggedIn = false;
        this.sideBarOpen = false;
      })
  }

  checkUser() {
    this.authService.currentUser().subscribe(
      response => {
        this.isLoggedIn = true;
        this.snackBar.open('Hi', 'OK', {
          duration: 2000,
        });
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
}
