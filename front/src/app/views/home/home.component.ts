import {Component, OnInit} from '@angular/core';
import {User} from "../../services/User";
import {UserService} from "../../services/user.service";
import {AuthService} from "../../services/auth.service";
import {catchError, of} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private baseUser: User = {
    "id": "1",
    "gender": "male",
    "firstname": "Owen",
    "lastname": "Lopez",
    "email": "owen.lopez@example.com",
    "password": "$2b$10$IExQBXEZVifvfEOWvWsmO.4.OocNb7zQzurQerwOQh1tZx/3okSp.",
    "phone": "02-37-79-78-39",
    "birthdate": "1992-12-26",
    "city": "Villeurbanne",
    "country": "France",
    "photo": "https://randomuser.me/api/portraits/men/40.jpg",
    "category": "Marketing",
    "isAdmin": false
  }

  user?: User;
  isAdmin: boolean = false;

  constructor(private userService: UserService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.userService.getRandomUser().pipe(
      catchError(() => of(this.baseUser))
    ).subscribe(user => this.user = user);
    this.isAdmin = this.authService.getStorageUser() ? this.authService.getStorageUser()!.isAdmin : false;
  }

}
