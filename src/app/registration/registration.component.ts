import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  email_valid = false;
  clickCount = 0;
  type = 'password';
  registering = false;
  hasAdded = false;
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(registerForm: NgForm): void {
    console.log(registerForm.value);
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
