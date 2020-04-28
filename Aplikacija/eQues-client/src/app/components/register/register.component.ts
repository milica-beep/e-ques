import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/User';
import { AuthService } from 'src/app/services/auth.service';
import { StudentYear } from 'src/app/models/studentYear';
import { Module } from 'src/app/models/module';
import { Role } from 'src/app/models/role';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isLoaded: boolean = false;
  registerForm: FormGroup;
  user: User;
  submitted = false;
  passwordsMatch: boolean = true;
  years: StudentYear[];
  isProffessor: boolean = false;

  modules: Module[];
  studentRole: Role;
  proffessorRole: Role;

  hidePass : boolean = true;
  hideConfirmPass : boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
    ) { }

  getRegistrationData() {
    this.authService.getRegistrationData().subscribe(data => {
      this.years = data.studentYears;
      this.modules = data.modules;
      this.studentRole = data.studentRole;
      this.proffessorRole = data.proffessorRole;

      this.isLoaded = true;
    })
  }

  userRoleChanged($event) {
    this.isProffessor = !this.isProffessor;
  }

  ngOnInit(): void {
    this.getRegistrationData();

    this.registerForm = this.formBuilder.group({
      role: ['', Validators.required],
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      studentId: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      email: ['', Validators.required],
      module: [''],
      year: ['']
    })
    this.setUserCategoryValidators();
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
        this.snackBar.open('Hi ' + this.user.name, 'OK', {
          duration: 2000,
        });
        window.location.reload();
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

  setUserCategoryValidators() {
    const studentId = this.registerForm.get('studentId');
    const module = this.registerForm.get('module');
    const year = this.registerForm.get('year');

    if(!this.isProffessor) {
      studentId.setValidators([Validators.required]);
      module.setValidators([Validators.required]);
      year.setValidators([Validators.required]);
    }

    studentId.updateValueAndValidity();
    module.updateValueAndValidity();
    year.updateValueAndValidity();

    this.registerForm.get('role').valueChanges.subscribe(role => {
      console.log(role);
      if (role == this.proffessorRole.id) {
        studentId.setValidators(null);
        module.setValidators(null);
        year.setValidators(null);
      }
      else if(role == this.studentRole.id) {
        studentId.setValidators([Validators.required]);
        module.setValidators([Validators.required]);
        year.setValidators([Validators.required]);
      }

      studentId.updateValueAndValidity();
      module.updateValueAndValidity();
      year.updateValueAndValidity();
    })


  }

}
