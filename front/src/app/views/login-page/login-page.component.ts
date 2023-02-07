import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/user.service";
import {catchError} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form: FormGroup;
  isLoading: boolean = false;
  displayErrorMessage: boolean = false;

  constructor(private auth: AuthService,
              private fb: FormBuilder,
              private router: Router,
              private userService: UserService) {

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  login() {
    this.isLoading = true;
    const val = this.form.value;
    if (val.email && val.password) {
      this.auth.login(val.email, val.password).pipe(
        catchError(err => {
          this.displayErrorMessage = true;
          this.isLoading = false;
          throw new Error(`Error: ${err}`)
        }),
      )
        .subscribe(
          (simplifiedUser) => {
            console.log("User is logged in");
            this.isLoading = false;
            this.userService.setUser(simplifiedUser);
            this.router.navigateByUrl('/');
          }
        );
    }
  }

}
