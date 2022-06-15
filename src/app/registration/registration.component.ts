import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UserInterface } from '../shared/types/interface/user-interface';
import { createUserAction } from '../store/actions/user.actions';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  clickCount = 0;
  type = 'password';
  registering = false;
  hasAdded = false;
  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  onSubmit(registerForm: NgForm): void {
    this.createUser(registerForm.value);
  }

  createUser(userForCreating: UserInterface) {
    this.store.dispatch(createUserAction({ user: userForCreating }))
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
