import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
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

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private router: Router) {

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
    if (this.form.valid) {
      this.authService.login(val.email, val.password).pipe(
        catchError(err => {
          this.displayErrorMessage = true;
          this.isLoading = false;
          throw new Error(`Error: ${err}`)
        }),
      )
        .subscribe(
          () => {
            this.isLoading = false;
            this.router.navigateByUrl('/home');
          }
        );
    }
  }

}
