import { Injectable } from '@angular/core';
import { UserInterface } from 'src/app/shared/types/interface/user-interface';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
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
}