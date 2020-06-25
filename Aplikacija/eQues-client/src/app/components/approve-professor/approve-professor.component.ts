import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-approve-professor',
  templateUrl: './approve-professor.component.html',
  styleUrls: ['./approve-professor.component.css']
})
export class ApproveProfessorComponent implements OnInit {
  professors: User[];

  displayedColumns: string[] = ['name', 'lastname', 'email', 'approve'];
  dataSource: any;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.getUnapprovedProfessors().subscribe(
      response => {
        this.professors = response['professors'];
        this.dataSource = this.professors;
      },
      error => {
        console.log(error);
      }
    )
  }

  approveProfessor(profId:number) {
    this.adminService.approveProfessor(profId).subscribe(
      response => {
        this.professors = response['professors'];
        this.dataSource = this.professors;
      },
      error => {
        console.log(error);
      }
    )
  }



}
