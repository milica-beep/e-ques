import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  users: User[];

  displayedColumns: string[] = ['name', 'lastname', 'email', 'delete'];
  dataSource: any;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.getAllUsers().subscribe(
      response => {
        this.users = response['users'];
        this.dataSource = this.users;
      },
      error => {
        console.log(error);
      }
    )
  }

  deleteUser(userId: number) {
    this.adminService.deleteUser(userId).subscribe(
      response => {
        this.users = response['users'];
        this.dataSource = this.users;
      },
      error => {
        console.log(error);
      }
    )
  }

}
