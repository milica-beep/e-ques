import { Component, OnInit, Injectable, LOCALE_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { formatDate, DatePipe } from '@angular/common';
import { Consultation } from 'src/app/models/consultation';
import { Subject } from 'src/app/models/subject';
import { Answer } from 'src/app/models/answer';
import { Question } from 'src/app/models/question';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})

export class UserProfileComponent implements OnInit {

  userId: number;
  currentUser: User;
  user: User;
  moduleName: String;
  hours: String[] = [
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'
  ];

  professorsConsultations: Consultation[];
  professorsSubjects: Subject[];

  addConsultationForm: FormGroup;
  signForConsultationForm: FormGroup;

  studentConsultations: Consultation[];
  studentGrades: number[];
  studentQuestions: Question[];

  file: any;
  imagePath: String;

  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private authService: AuthService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  // TODO
  // pretraga
  // admin - pregled svih naloga
  // tekst editor za dodavanje pitanja/odgovora


  ngOnInit(): void {
    this.authService.emitChange('');

    this.activatedRoute.paramMap.subscribe(params => {
      this.userId = parseInt(params.get('id'));

      if(this.currentUser != undefined) { // Korisnik se sa necijeg profila vraca na svoj (ili neki drugi), podaci moraju ponovo da se pribave
        this.checkUser();
      }
    })

    this.userService.userLogged.subscribe(user => {
      this.currentUser = user;
     // this.imagePath = 'http://127.0.0.1:5000/static/images/user_images/' + this.currentUser?.image.path;

      console.log(user);

      this.checkUser();
    })

    this.addConsultationForm = this.formBuilder.group({
      date: ['', Validators.required],
      hour: ['', Validators.required]
    });

    this.signForConsultationForm = this.formBuilder.group({
      time: ['', Validators.required]
    })



    // this.router.events.subscribe(event => {
    //   console.log('router event user prof komp');
    //   this.activatedRoute.paramMap.subscribe(params => {
    //     this.userId = parseInt(params.get('id'));
    //     console.log('user id: ' + this.userId);
    //   })

    //   if(this.userId != this.currentUser?.id) {
    //     this.getUserData();
    //     console.log('razlicito');
    //   }
    //   else {
    //     this.user = this.currentUser;
    //     console.log('isto ');
    //   }
    // })
  }

  getUserData() {
    this.userService.getUserData(this.userId).subscribe(resp => {
      this.user = resp['user'];
      if (this.user.roleId == 1) {
        this.moduleName = resp['moduleName'];
        this.studentConsultations = resp['studentConsultations'];
        this.studentGrades = resp['grades'];
        this.studentQuestions = resp['questions'];
        this.user.image = resp['image'];

        this.imagePath = 'http://127.0.0.1:5000/static/images/user_images/' + this.user?.image.path;

        console.log(this.studentGrades);
      }
      else if (this.user.roleId == 2) {
        this.imagePath = 'http://127.0.0.1:5000/static/images/user_images/' + this.user?.image.path;
        this.professorsConsultations = resp['consultations'];
        this.professorsSubjects = resp['subjects'];
      }
    })
  }

  checkUser() {
    if(this.userId != this.currentUser?.id) {
      this.getUserData();
    }
    else {
      this.userId = this.currentUser.id;
      this.getUserData();
      //this.user = this.currentUser;
    }
  }

  submitConsultation(data: any) {
    let pipe = new DatePipe('en-GB');

    let consultation: Consultation = new Consultation();

    consultation.date = pipe.transform(data.date, 'dd-MM-yyyy').toString();
    consultation.time = data.hour;
    consultation.professor = new User();
    consultation.professor.id = this.currentUser.id;

    this.userService.addConsultation(consultation).subscribe(
      response => {
        this.professorsConsultations = response['consultations'];
      },
      error => {
        console.log(error);
      }
    )
  }

  deleteConsultation(consultationId: number) {
    this.userService.deleteConsultation(consultationId).subscribe(
      response => {
        this.professorsConsultations = response['consultations'];
      }
    )
  }

  signForConsultation() {
    let consId: number = this.signForConsultationForm.get('time').value;

    let data = {
      'consultationId': consId,
      'userId': this.currentUser.id
    }

    this.userService.signForConsultation(data).subscribe(
      response => {
        console.log(response);
      }
    )
  }

  editData() {

  }

  onFileChanged(event) {
    this.file = event.target.files[0];
    console.log(this.file);
  }

  onUpload() {
    // this.http is the injected HttpClient
    this.userService.uploadFile(this.file, this.currentUser.id).subscribe(
      response => {
        this.currentUser.image = response['path'];
        this.imagePath = 'http://127.0.0.1:5000/static/images/user_images/' + this.currentUser?.image;
      },
      error => {
        console.log(error);
      }
    )
  }
}
