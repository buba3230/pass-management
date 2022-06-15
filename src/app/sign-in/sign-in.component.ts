import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UserInterface } from '../shared/types/interface/user-interface';
import { getUserByIdAction, getUserByInfoAction } from '../store/actions/user.actions';
import { userErrorSelector } from '../store/selectors/user.selectors';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  email_valid = false;
  clickCount = 0;
  type = 'password';
  registering = false;
  hasAdded = false;
  error$ = this.store.select(userErrorSelector);
  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  onSubmit(signInForm: NgForm): void {
    console.log(signInForm.value);
    const user = { "id": 0, "name": signInForm.value.name, "e-mail": "", password: signInForm.value.password };
    this.signIn(user);
  }

  signIn(userData: UserInterface) {
    this.store.dispatch(getUserByInfoAction({ user: userData }));
  }

  togglePasswordInput(): void {
    if (this.clickCount == 0) {
      this.clickCount++;
      return;
    }
    this.type = this.type === 'password' ? 'text' : 'password'
  }

  clearToggle(): void {
    this.clickCount = 0
  }

}
