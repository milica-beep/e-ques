import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

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
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
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
          console.log(data['message']);
        },
        error => {
          console.log('ne ok');
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
}
