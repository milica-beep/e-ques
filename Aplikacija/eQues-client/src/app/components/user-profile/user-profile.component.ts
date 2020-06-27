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

  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private authService: AuthService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  // TODO
  // dodaj predmet kod biranja konsultacija - veza izmedju subject i cons + dodaj u modelu ovde subject_id
  // postavljena pitanja - link ka diskusiji
  // pretraga
  // admin - pregled svih naloga
  // upload slike
  // izmena podataka na profilu
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

        console.log(this.studentGrades);
      }
      else if (this.user.roleId == 2) {
        console.log('u prof');
        console.log(resp);
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
    consultation.professorId = this.currentUser.id;

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
}
