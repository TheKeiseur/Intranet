import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../services/User";
import * as moment from "moment";
import {UserService} from "../../services/user.service";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

  @Input()
  user?: User;
  isAdmin: boolean = false;

  constructor(private userService: UserService,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.isAdmin = this.authService.getIsAdmin();
  }

  calcAge(dateString: string) {
    const birthday = +new Date(dateString);
    return ~~((Date.now() - birthday) / (31557600000));
  }

  getBirthdate(dateString: string) {
    const birthday = new Date(dateString);
    return moment(birthday).locale('fr').format('DD MMMM');
  }

  deleteUser() {
    this.userService.deleteUserById(this.user!.id).subscribe(() => this.router.navigateByUrl('/users'));
  }

}
