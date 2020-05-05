import { Component, OnInit, Injectable } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide : boolean = true;
  loginForm: FormGroup;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }


  onSubmit() {
  this.submitted = true;

  if (this.loginForm.invalid) {
    return;
  }

  this.authService.login(this.f.email.value, this.f.password.value)
    .subscribe(
        data => {
         this.openSnackBar(data['message'], 'OK');
         // window.location.reload();
         this.authService.emitChange('Logged in');
         this.router.navigate(['/home']);

        },
        err => {
          if (err.status == 422) {
            const validationErrors = err.error;
            Object.keys(validationErrors).forEach(prop => {
              const formControl = this.loginForm.get(prop);
              if (formControl) {
                // activate the error message
                formControl.setErrors({
                  serverError: validationErrors[prop]
                });
              }
            });
          }
          else {
            // HANDLE UNEXPECTED SERVER ERROR
            this.openSnackBar(err.error['message'], 'OK');
          }
        });
  }

  testJWTProtected() {
    this.authService.test().subscribe(
      data => {
        console.log(data.hello);
      },
      error => {
      console.log('ne ok');
      });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
