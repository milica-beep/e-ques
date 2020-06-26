import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { Subject } from 'src/app/models/subject';

@Component({
  selector: 'app-delete-subject',
  templateUrl: './delete-subject.component.html',
  styleUrls: ['./delete-subject.component.css']
})
export class DeleteSubjectComponent implements OnInit {
  deleteSubjectForm: FormGroup;
  allSubjects: Subject[];

  constructor(private formBuilder: FormBuilder,
              private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.getSubjects().subscribe(
      response => {
        this.allSubjects = response['subjects'];
      }
    )

    this.deleteSubjectForm = this.formBuilder.group({
      name: ['', Validators.required]
    })
  }

  onSubmit() {
    if (this.deleteSubjectForm.invalid) {
      return;
    }

    let subjectId: number = this.deleteSubjectForm.get('name').value;

    this.adminService.deleteSubject(subjectId).subscribe(
      response => {
        this.allSubjects = response['subjects'];
      }
    )
  }

}
