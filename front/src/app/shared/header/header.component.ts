import {Component, OnInit} from '@angular/core';
import {SimplifiedUser} from "../../services/User";
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public connectedUser?: SimplifiedUser;

  constructor(private auth: AuthService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.connectedUser = this.userService.getSimplifiedUser();
  }

  isLoggedIn() {
    if (this.auth.isLoggedIn()) {
      this.connectedUser = this.userService.getSimplifiedUser();
    }
    return this.auth.isLoggedIn();
  }

  logout() {
    this.connectedUser = undefined;
    this.auth.logout();
  }
}
