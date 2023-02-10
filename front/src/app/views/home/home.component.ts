import {Component, OnInit} from '@angular/core';
import {User} from "../../services/User";
import {UserService} from "../../services/user.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  randUser?: User;
  isAdmin: boolean = false;

  constructor(private userService: UserService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.getRandomUser();
    this.isAdmin = this.authService.getIsAdmin();
  }

  getRandomUser() {
    this.userService.getRandomUser().subscribe(user => this.randUser = user);
  }
}
