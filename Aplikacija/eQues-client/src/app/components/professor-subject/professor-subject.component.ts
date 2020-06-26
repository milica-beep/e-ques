import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { Subject } from 'src/app/models/subject';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-professor-subject',
  templateUrl: './professor-subject.component.html',
  styleUrls: ['./professor-subject.component.css']
})
export class ProfessorSubjectComponent implements OnInit {
  professors: User[];
  subjects: Subject[];

  profSubjForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.getProfsSubj().subscribe(
      response => {
        this.professors = response['professors'];
        this.subjects = response['subjects'];
      },
      error => {
        console.log(error);
      }
    )

    this.profSubjForm = this.formBuilder.group({
      professor: ['', Validators.required],
      subject: ['', Validators.required]
    })

  }

  onSubmit() {
    if (this.profSubjForm.invalid) {
      return;
    }
    let professor: User = this.profSubjForm.get('professor').value;
    let subject: Subject = this.profSubjForm.get('subject').value;

    console.log(professor);
    console.log(subject);

    let data = {
      'professorId': professor,
      'subjectId': subject
    }

    console.log(data);

    this.adminService.addSubjectToProfessor(data).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    )
  }

}
