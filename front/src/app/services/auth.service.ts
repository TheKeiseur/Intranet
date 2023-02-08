import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {User} from "./User";
import {environment} from "../../environments/environment";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  connectedUser?: User;

  constructor(private http: HttpClient,
              private jwtService: JwtHelperService,
              private router: Router) {
    this.connectedUser = this.getConnectedUser();
  }

  login(email: string, password: string): Observable<{ "idToken": string }> {
    const body = {
      "email": email,
      "password": password
    }
    return this.http.post<{ "idToken": string }>(`${environment.baseUrl}/login`, body).pipe(
      tap(response => this.setSession(response.idToken))
    );
  }

  getConnectedUser(): User | undefined {
    if (this.isLoggedIn()) {
      if (!this.connectedUser) {
        this.connectedUser = this.getTokenInfos(localStorage.getItem("id_token")!);
      }
      return this.connectedUser;
    }
    return undefined;
  }

  setConnectedUser(user: User): void {
    this.connectedUser = user;
  }

  setSession(token: string): User {
    localStorage.setItem('id_token', token);
    const tokenInfo = this.jwtService.decodeToken(token);
    this.setConnectedUser(tokenInfo);
    return tokenInfo;
  }

  logout() {
    localStorage.removeItem("id_token");
    this.connectedUser = undefined;
    this.router.navigateByUrl('/login');
  }

  public isLoggedIn(): boolean {
    const token = localStorage.getItem("id_token");
    if (token && this.jwtService.isTokenExpired(token)) {
      this.logout();
    }
    return !!token;
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  public getIsAdmin(): boolean {
    return this.getConnectedUser() ? this.getConnectedUser()!.isAdmin : false;
  }

  private getTokenInfos(token: string): User {
    return this.jwtService.decodeToken(token)!;
  }

}
