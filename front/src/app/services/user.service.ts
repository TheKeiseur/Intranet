import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "./User";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${environment.baseUrl}/user/${id}`);
  }

  getRandomUser(): Observable<User> {
    return this.http.get<User>(`${environment.baseUrl}/random-user`);
  }

  deleteUserById(id: string) {
  }

}
