import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User'
import { TestService } from '../../services/test.service'

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  users:User[];

  constructor(private userService:TestService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    })
  }

}
