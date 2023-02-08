import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SimplifiedUser, User} from "./User";
import {environment} from "../../environments/environment";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user?: SimplifiedUser;

  constructor(private http: HttpClient,
              private authService: AuthService) {
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${environment.baseUrl}/user/${id}`);
  }

  getRandomUser(): Observable<User> {
    return this.http.get<User>(`${environment.baseUrl}/random-user`);
  }

  deleteUserById(id: string) {

  }

  getSimplifiedUser(): SimplifiedUser | undefined {
    if (!this.user && this.authService.isLoggedIn()) {
      this.user = this.authService.getStorageUser();
    }
    return this.user;
  }

  setUser(user: SimplifiedUser): void {
    this.user = user;
  }

  resetUser(): void {
    this.user = undefined;
  }

}
