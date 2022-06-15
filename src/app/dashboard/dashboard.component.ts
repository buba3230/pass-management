import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UserInterface } from '../shared/types/interface/user-interface';
import { getUserByIdAction, updateUserAction } from '../store/actions/user.actions';
import { selectedUserSelector } from '../store/selectors/user.selectors';
import { getItem } from "../store/state/store";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  selectedUser$ = this.store.select(selectedUserSelector);
  selectedUser = getItem('selectedUser');
  mainModify = false;
  saving = false;
  hasSaved = false;
  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  onSubmitMain(mainModifyForm: NgForm): void {
    const value = { ...mainModifyForm.value, id: this.selectedUser.id };
    console.log(value);
    this.updateUser(value, this.selectedUser.id);
  }

  updateUser(userForUpdating: UserInterface, id: number) {
    this.store.dispatch(updateUserAction({ user: userForUpdating }));
    this.store.dispatch(getUserByIdAction({ id }))
  }

  toggleMainModify(): void {
    this.mainModify = !this.mainModify;
  }

}
