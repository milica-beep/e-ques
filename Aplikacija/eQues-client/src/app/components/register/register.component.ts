import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { UserService } from '../../services/user.service'
import { User } from '../../models/User'
import { AuthService } from 'src/app/services/auth.service';
import { StudentYear } from 'src/app/models/studentYear';
import { Module } from 'src/app/models/module';
import { Role } from 'src/app/models/role';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  user: User;
  error: string;
  submitted = false;

  years: StudentYear[];
  //defaultYear: string = this.years[0];

  modules: Module[];
  roles: Role[];

  hide : boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService
    ) { }

  getRegistrationData() {
    this.authService.getRegistrationData().subscribe(data => {
      this.years = data.studentYears;
      this.modules = data.modules;
      this.roles = data.roles;
    })
  }


  ngOnInit(): void {
    this.getRegistrationData();

    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      module: ['', Validators.required],
      year: ['', Validators.required]
    })

  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.user = new User();

    this.submitted = true;

    if(this.registerForm.invalid) {
      return;
    }

    this.user = this.registerForm.value;


    this.authService.register(this.user).subscribe(
      data => {

      },
      err => {
        console.log(err);
        if (err.status == 422) {
          const validationErrors = err.error;
          console.log(validationErrors);
          Object.keys(validationErrors).forEach(prop => {
            const formControl = this.registerForm.get(prop);
            console.log(prop + ' ' + validationErrors[prop]);
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
        }
      }
    );
  }

}
