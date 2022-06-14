import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

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
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(signInForm: NgForm): void {
    console.log(signInForm.value);
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
