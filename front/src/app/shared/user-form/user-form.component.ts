import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from "../../services/User";
import {UserService} from "../../services/user.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  form!: FormGroup;
  @Input()
  user?: User;
  @Input()
  isAdd = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      gender: new FormControl(this.user?.gender, [Validators.required]),
      category: new FormControl(this.user?.category, [Validators.required]),
      lastname: new FormControl(this.user?.lastname, [Validators.required]),
      firstname: new FormControl(this.user?.firstname, [Validators.required]),
      email: new FormControl(this.user?.email, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      confirmPassword: new FormControl(null),
      phone: new FormControl(this.user?.phone, [Validators.required]),
      birthdate: new FormControl(this.user?.birthdate, [Validators.required]),
      city: new FormControl(this.user?.city, [Validators.required]),
      country: new FormControl(this.user?.country, [Validators.required]),
      photo: new FormControl(this.user?.photo, [Validators.required]),
      isAdmin: new FormControl(this.user?.isAdmin),
    });
  }

  get email() {
    return this.form.get('email')!;
  }

  getErrorMessage() {
    if (this.email!.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email!.hasError('email') ? 'Not a valid email' : '';
  }

  submit() {
    this.isAdd ? this.createUser() : this.updateUser();
  }

  getIsAdmin(): boolean {
    return this.authService.getIsAdmin();
  }

  private createUser() {
    const user: User = this.form.value;
    if (user.isAdmin === null || undefined) {
      user.isAdmin = false;
    }
    this.userService.createUser(user).subscribe(() => this.router.navigateByUrl('/users'));
  }

  private updateUser() {
    const user: User = this.form.value;
    user.id = this.user!.id;
    this.userService.updateUser(user).subscribe(() => this.router.navigateByUrl('/users'));
  }
}
