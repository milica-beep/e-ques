import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { UserService } from '../../services/user.service'
import { User } from '../../models/User'
import { AuthService } from 'src/app/services/auth.service';

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
  years=['I','II','III','IV']
  selectedValue=1;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      module: ['', Validators.required],
      year: '1'
      
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
    
    /*this.user = new User();
    this.user.name = 'Milica';
    this.user.lastname = 'Nikolic';
    this.user.email = 'nekotamo@elfak.rs';
    this.user.password = '123456';
    this.user.year = 'III';
    this.user.module = 'Computer Science'; */

    this.authService.register(this.user).subscribe(
      data => {
        console.log(data['message']);
      },
      error => {
        console.log('ne ok');
      });
  }

}
