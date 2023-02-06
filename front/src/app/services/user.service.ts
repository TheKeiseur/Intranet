import {Injectable} from '@angular/core';
import {User} from "./User";
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public baseUser?: User = {
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

  constructor(private http: HttpClient) {
  }

  getUser(): Observable<User | undefined> {
    return of(this.baseUser);
  }

  logout() {
    this.baseUser = undefined;
    console.log(this.baseUser);
  }
}
