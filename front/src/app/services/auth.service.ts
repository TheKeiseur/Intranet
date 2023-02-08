import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable, tap} from "rxjs";
import {SimplifiedUser, UserConnexionDto} from "./User";
import {environment} from "../../environments/environment";
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public baseUser: UserConnexionDto = {
    "id": "1",
    "photo": "https://randomuser.me/api/portraits/men/40.jpg",
    "isAdmin": true,
    "idToken": "hfezhfozhfeozjfk",
    "expiresIn": "1675782896105"
  }

  constructor(private http: HttpClient) {
  }

  login(email: string, password: string): Observable<SimplifiedUser> {
    const body = {
      "email": email,
      "password": password
    }
    return this.http.post<UserConnexionDto>(`${environment.baseUrl}/login`, body).pipe(
      tap(authResult => this.setSession(authResult)),
      map((authResult: UserConnexionDto) => {
        return {id: authResult.id, photo: authResult.photo, isAdmin: authResult.isAdmin};
      }),
    );
  }

  private setSession(user: UserConnexionDto) {
    const expiresAt = moment().add(user.expiresIn, 'second');
    localStorage.setItem('id_token', user.idToken);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem("user_id", user.id);
    localStorage.setItem("user_photo", user.photo);
    localStorage.setItem("is_admin", String(user.isAdmin));
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_photo");
    localStorage.removeItem("is_admin");
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    // @ts-ignore
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  getStorageUser(): SimplifiedUser | undefined {
    if (localStorage.getItem("user_id")
      && localStorage.getItem("user_photo")
      && localStorage.getItem("is_admin")) {
      return {
        id: localStorage.getItem("user_id")!,
        photo: localStorage.getItem("user_photo")!,
        isAdmin: (localStorage.getItem("is_admin") === 'true')
      };
    }
    return undefined;
  }
}
