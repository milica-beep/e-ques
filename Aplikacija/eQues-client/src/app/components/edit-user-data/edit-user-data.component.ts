import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/User';
import { Module } from 'src/app/models/module';
import { StudentYear } from 'src/app/models/studentYear';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-user-data',
  templateUrl: './edit-user-data.component.html',
  styleUrls: ['./edit-user-data.component.css']
})
export class EditUserDataComponent implements OnInit {
  user: User;
  modules: Module[];
  studentYears: StudentYear[];
  submitted: boolean = false;

  editUserDataForm: FormGroup;

  hideOldPass : boolean = true;
  hideNewPass: boolean = true;
  hideConfirmPass : boolean = true;

  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              private router: Router) { }

  ngOnInit(): void {
    this.user = new User;

    this.editUserDataForm = this.formBuilder.group({
      name: [''],
      lastname: [''],
      studentId: [''],
      oldPassword:[''],
      newPassword: ['', Validators.minLength(6)],
      confirmPassword: [''],
      email: [''],
      module: [''],
      year: ['']
    })

    this.activatedRoute.paramMap.subscribe(params => {
      this.user.id = parseInt(params.get('userId'));
    });

    this.userService.getEditUserData(this.user.id).subscribe(
      response => {
        this.user = response['user'];
        this.modules = response['modules'];
        this.studentYears = response['studentYears'];

        let userData = {
          'name': this.user?.name,
          'lastname': this.user?.lastname,
          'studentId' : this.user?.studentId,
          'oldPassword': '',
          'newPassword': '',
          'confirmPassword': '',
          'email': this.user?.email,
          'module': this.user?.moduleId,
          'year': this.user?.studentYearId
        };

        console.log(userData);

        this.editUserDataForm.setValue(userData);
      }
    )
  }

  onSubmit() {
    this.submitted = true;

    if(this.editUserDataForm.invalid) {
      return;
    }

    this.user.name = this.editUserDataForm.get('name').value;
    this.user.lastname = this.editUserDataForm.get('lastname').value;
    this.user.studentId = this.editUserDataForm.get('studentId').value;
    this.user.email = this.editUserDataForm.get('email').value;
    this.user.moduleId = this.editUserDataForm.get('module').value;
    this.user.studentYearId = this.editUserDataForm.get('year').value;

    if(this.editUserDataForm.get('newPassword').value != '' && this.editUserDataForm.get('confirmPassword').value != ''
      && this.editUserDataForm.get('oldPassword').value != '') {
        let data = {
          'userId': this.user.id,
          'oldPassword': this.editUserDataForm.get('oldPassword').value,
          'newPassword': this.editUserDataForm.get('newPassword').value,
          'confirmPassword': this.editUserDataForm.get('confirmPassword').value
        }

        this.userService.changePassword(data).subscribe(
          response => {
            this.snackBar.open(response['message'], 'OK', {
              duration: 2000,
            });
            window.location.reload();
          },
          error => {
            console.log(error.error['error']);
            this.snackBar.open(error.error['error'], 'OK', {
              duration: 2000,
            });
          }
        )
    }

    this.userService.updateUserData(this.user).subscribe(
      response => {
        this.snackBar.open(response['message'], 'OK', {
          duration: 2000,
        });

        this.router.navigate(['/user', this.user.id]);
      }
    )

    // this.authService.register(this.user).subscribe(
    //   data => {
    //     this.snackBar.open('Hi ' + this.user.name, 'OK', {
    //       duration: 2000,
    //     });
    //     window.location.reload();
    //   },
    //   err => {
    //     console.log(err);
    //     if (err.status == 422) {
    //       const validationErrors = err.error;
    //       console.log(validationErrors);
    //       Object.keys(validationErrors).forEach(prop => {
    //         const formControl = this.registerForm.get(prop);
    //         console.log(prop + ' ' + validationErrors[prop]);
    //         if (formControl) {
    //           // activate the error message
    //           formControl.setErrors({
    //             serverError: validationErrors[prop]
    //           });
    //         }
    //       });
    //     }
    //     else {
    //       // HANDLE UNEXPECTED SERVER ERROR
    //     }
    //   }
    // );
  }


}
