import { Injectable } from '@angular/core';
import { DevicesInterface, UserInterface } from 'src/app/shared/types/interface/user-interface';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {
    private url = '/api/users';
    constructor(public http: HttpClient,
    ) { }

    getUser(id: number): Observable<UserInterface> {
        return this.http.get<UserInterface>(this.url + '/' + id).pipe(
            catchError((error) => throwError(`Server do not response. Error : ${error.toString()}`))
        )
    }

    addDeviceToUser(userId: number, newDevice: DevicesInterface): Observable<any> {
        return this.http.get<UserInterface[]>(this.url).pipe(
            map((users: UserInterface[]) => users.filter(user => user.id === userId)[0]),
            switchMap((user: UserInterface) => {
                if (!user.hasOwnProperty('devices')) {
                    user = { ...user, devices: [] };
                    newDevice = { ...newDevice, deviceId: 1 }
                } else {
                    if (user.devices.length > 0) {
                        let id = Math.max(...user.devices.map(el => el.deviceId));
                        newDevice = { ...newDevice, deviceId: ++id }
                    }
                    else {
                        newDevice = { ...newDevice, deviceId: 1 }
                    }
                }
                user.devices.push(newDevice);
                return this.http.put(this.url + '/' + userId, user).pipe(
                    catchError((error) => throwError(`Server do not response. Error : ${error.toString()}`))
                );
            })
        )
    }

    deleteDevice(userId: number, deviceId: number): Observable<any> {
        return this.http.get<UserInterface[]>(this.url).pipe(
            map((users: UserInterface[]) => users.filter(user => user.id === userId)[0]),
            switchMap((user: UserInterface) => {
                user.devices = user.devices.filter(device => device.deviceId !== deviceId);
                return this.http.put(this.url + '/' + userId, user).pipe(
                    catchError((error) => throwError(`Server do not response. Error : ${error.toString()}`))
                );
            })
        )
    }

    updateDevice(userId: number, newDevice: DevicesInterface): Observable<any> {
        return this.http.get<UserInterface[]>(this.url).pipe(
            map((users: UserInterface[]) => users.filter(user => user.id === userId)[0]),
            switchMap((user: UserInterface) => {
                user.devices = user.devices.map(device => {
                    if (device.deviceId === newDevice.deviceId) {
                        return newDevice
                    }
                    return device;
                });
                return this.http.put(this.url + '/' + userId, user).pipe(
                    catchError((error) => throwError(`Server do not response. Error : ${error.toString()}`))
                );
            })
        )
    }

    getUserByInfo(user: UserInterface): Observable<UserInterface> {
        return this.http.get<UserInterface[]>(this.url).pipe(
            map((users: UserInterface[]) => users.find(item => item.name === user.name && item.password === user.password)),
            catchError((error) => throwError(`Server do not response. Error : ${error.toString()}`))
        )
    }

    createUser(newUser: UserInterface): Observable<any> {
        return this.http.post<UserInterface>(this.url, newUser).pipe(
            catchError((error) => throwError(`Server do not response. Error : ${error.toString()}`))
        );
    }

    updateUser(UserForUpdating: UserInterface): Observable<any> {
        return this.http.put(this.url + '/' + UserForUpdating.id, UserForUpdating).pipe(
            catchError((error) => throwError(`Server do not response. Error : ${error.toString()}`))
        );
    }

    getUsers(): Observable<UserInterface[]> {
        return this.http.get<UserInterface[]>(this.url).pipe(
            catchError((error) => throwError(`Server do not response. Error : ${error.toString()}`))
        );
    }
}