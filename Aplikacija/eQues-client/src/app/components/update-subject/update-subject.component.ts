import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { Subject } from 'src/app/models/subject';
import { Topic } from 'src/app/models/topic';

@Component({
  selector: 'app-update-subject',
  templateUrl: './update-subject.component.html',
  styleUrls: ['./update-subject.component.css']
})
export class UpdateSubjectComponent implements OnInit {
  updateSubjectForm: FormGroup;

  topics: Topic[];
  allSubjects: Subject[];

  constructor(private formBuilder: FormBuilder,
              private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.getSubjects().subscribe(
      response => {
        this.allSubjects = response['subjects'];
      }
    )

    this.updateSubjectForm = this.formBuilder.group({
      subjectId: ['', Validators.required],
      name: ['', Validators.required],
      description: ['']
    })
  }

  // TODO prikazi sve oblasti za taj predmet sa strane

  onSubmit() {
    if (this.updateSubjectForm.invalid) {
      return;
    }

    let subjectId: number = this.updateSubjectForm.get('subjectId').value;
    let topic: Topic = new Topic();

    topic.name = this.updateSubjectForm.get('name').value;
    topic.description = this.updateSubjectForm.get('description').value;

    let data = {
      'subjectId': subjectId,
      'name': topic.name,
      'description': topic.description
    }

    this.adminService.addTopic(data).subscribe(
      response => {
        this.topics = response['topics'];
      }
    )
  }
}
