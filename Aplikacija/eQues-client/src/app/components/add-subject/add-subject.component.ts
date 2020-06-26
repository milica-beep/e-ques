import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { Module } from 'src/app/models/module';
import { StudentYear } from 'src/app/models/studentYear';
import { Subject } from 'src/app/models/subject';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.css']
})
export class AddSubjectComponent implements OnInit {
  addSubjectForm: FormGroup;

  modules: Module;
  studentYears: StudentYear[];

  constructor(private formBuilder: FormBuilder,
              private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.getAddSubjectData().subscribe(
      resp => {
        this.modules = resp['modules'];
        this.studentYears = resp['studentYears'];
      }
    )

    this.addSubjectForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      moduleId: ['', Validators.required],
      studentYearId: ['', Validators.required]
    })
  }

  onSubmit() {
    if (this.addSubjectForm.invalid) {
      return;
    }

    let subject: Subject = this.addSubjectForm.value;

    this.adminService.addSubject(subject).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    )

  }

}
