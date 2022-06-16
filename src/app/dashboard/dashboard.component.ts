import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AccountInterface, UserInterface } from '../shared/types/interface/user-interface';
import { createAccountAction, deleteAccountAction, getUserByIdAction, updateAccountAction, updateUserAction } from '../store/actions/user.actions';
import { selectedUserSelector } from '../store/selectors/user.selectors';
import { getItem } from "../store/state/sessionStorage";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  selectedUser$ = this.store.select(selectedUserSelector);
  selectedUser: UserInterface = getItem('selectedUser');
  mainModify = false;
  accountModify = false;
  currentUser: UserInterface;
  selectedUserSubscription: Subscription;
  deleteId: number;
  account: AccountInterface;
  isModify = false;
  type = 'password';
  clickCount = 0;

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  onSubmitMain(mainModifyForm: NgForm): void {
    let value = { ...mainModifyForm.value, id: this.selectedUser.id };
    if (this.currentUser.accounts) {
      value = { ...value, accounts: this.currentUser.accounts };
    }
    this.updateUser(value, this.selectedUser.id);
    this.mainModify = false;
  }

  updateUser(userForUpdating: UserInterface, id: number) {
    this.store.dispatch(updateUserAction({ user: userForUpdating }));
    this.store.dispatch(getUserByIdAction({ id }))
  }

  onSubmitAccount(AccountModifyForm: NgForm): void {
    this.addAccount(this.selectedUser.id, AccountModifyForm.value);
    this.accountModify = false;
  }

  addAccount(userId: number, account: AccountInterface): void {
    this.store.dispatch(createAccountAction({ userId, account }));
    this.store.dispatch(getUserByIdAction({ id: userId }))
  }

  deleteAccount(id: number): void {
    this.store.dispatch(deleteAccountAction({ userId: this.selectedUser.id, accountId: id }));
    this.store.dispatch(getUserByIdAction({ id: this.selectedUser.id }))
  }

  deleteAccountQuestion(id: number) {
    this.deleteId = id;
  }

  cancelDelete() {
    this.deleteId = null;
  }

  allowModify(account: AccountInterface): void {
    this.isModify = true;
    this.accountModify = true;
    this.account = { ...account };
  }

  modifyAccount(accountModifyForm: NgForm): void {
    const value = { ...accountModifyForm.value, accountId: this.account.accountId };
    this.store.dispatch(updateAccountAction({ userId: this.selectedUser.id, account: value }));
    this.store.dispatch(getUserByIdAction({ id: this.selectedUser.id }));
    this.accountModify = false;
    this.account = { accountId: null, accountName: '', accountPassword: '' };
  }

  setCurrentUser(user: UserInterface): void {
    this.currentUser = { ...user };
  }

  toggleMainModify(): void {
    this.mainModify = !this.mainModify;
  }

  toggleAccountModify(): void {
    this.isModify = false;
    this.accountModify = !this.accountModify;
    this.account = { accountId: null, accountName: '', accountPassword: '' };
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

  changeToAsterics(value: string): string {
    let size = value.length;
    let asterics = '';
    while (size > 0) {
      asterics += '•';
      size--;
    }
    return asterics;
  }

}
