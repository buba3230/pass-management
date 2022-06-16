import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { DevicesInterface, UserInterface } from '../shared/types/interface/user-interface';
import { createDeviceAction, deleteDeviceAction, getUserByIdAction, updateDeviceAction, updateUserAction } from '../store/actions/user.actions';
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
  deviceModify = false;
  currentUser: UserInterface;
  selectedUserSubscription: Subscription;
  deleteId: number;
  device: DevicesInterface;
  isModify = false;
  type = 'password';
  clickCount = 0;

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  onSubmitMain(mainModifyForm: NgForm): void {
    let value = { ...mainModifyForm.value, id: this.selectedUser.id };
    if (this.currentUser.devices) {
      value = { ...value, devices: this.currentUser.devices };
    }
    this.updateUser(value, this.selectedUser.id);
    this.mainModify = false;
  }

  updateUser(userForUpdating: UserInterface, id: number) {
    this.store.dispatch(updateUserAction({ user: userForUpdating }));
    this.store.dispatch(getUserByIdAction({ id }))
  }

  onSubmitDevice(deviceModifyForm: NgForm): void {
    this.addDevice(this.selectedUser.id, deviceModifyForm.value);
    this.deviceModify = false;
  }

  addDevice(userId: number, device: DevicesInterface): void {
    this.store.dispatch(createDeviceAction({ userId, device }));
    this.store.dispatch(getUserByIdAction({ id: userId }))
  }

  deleteDevice(id: number): void {
    this.store.dispatch(deleteDeviceAction({ userId: this.selectedUser.id, deviceId: id }));
    this.store.dispatch(getUserByIdAction({ id: this.selectedUser.id }))
  }

  deleteDeviceQuestion(id: number) {
    this.deleteId = id;
  }

  cancelDelete() {
    this.deleteId = null;
  }

  allowModify(device: DevicesInterface): void {
    this.isModify = true;
    this.deviceModify = true;
    this.device = { ...device };
  }

  modifyDevice(deviceModifyForm: NgForm): void {
    const value = { ...deviceModifyForm.value, deviceId: this.device.deviceId };
    this.store.dispatch(updateDeviceAction({ userId: this.selectedUser.id, device: value }));
    this.store.dispatch(getUserByIdAction({ id: this.selectedUser.id }));
    this.deviceModify = false;
    this.device = { deviceId: null, deviceName: '', devicePassword: '' };
  }

  setCurrentUser(user: UserInterface): void {
    this.currentUser = { ...user };
  }

  toggleMainModify(): void {
    this.mainModify = !this.mainModify;
  }

  toggleDeviceModify(): void {
    this.isModify = false;
    this.deviceModify = !this.deviceModify;
    this.device = { deviceId: null, deviceName: '', devicePassword: '' };
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
