import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../services/User";
import * as moment from "moment";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

  @Input()
  user?: User;

  @Input()
  isAdmin: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
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
    this.userService.deleteUserById(this.user!.id);
  }

}
