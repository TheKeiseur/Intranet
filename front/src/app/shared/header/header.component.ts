import {Component, OnInit} from '@angular/core';
import {User} from "../../services/User";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public connectedUser?: User;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.connectedUser = this.authService.getConnectedUser();
  }

  isLoggedIn() {
    const isUserLogged = this.authService.isLoggedIn();
    if (isUserLogged && !this.connectedUser) {
      this.connectedUser = this.authService.getConnectedUser();
    }
    return isUserLogged;
  }

  logout() {
    this.connectedUser = undefined;
    this.authService.logout();
  }
}
