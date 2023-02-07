import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../services/User";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public connectedUser?: User;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe(user => this.connectedUser = user);
  }

  logout() {
    this.connectedUser = undefined;
    this.userService.logout();
  }
}
