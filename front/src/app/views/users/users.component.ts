import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {Observable} from "rxjs";
import {User} from "../../services/User";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users$!: Observable<User[]>
  users!: User;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.users$ = this.userService.getAllUsers();
  }

}
