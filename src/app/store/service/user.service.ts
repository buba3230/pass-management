import { Injectable } from '@angular/core';
import { AccountInterface, UserInterface } from 'src/app/shared/types/interface/user-interface';
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

    addAccountToUser(userId: number, newAccount: AccountInterface): Observable<any> {
        return this.http.get<UserInterface[]>(this.url).pipe(
            map((users: UserInterface[]) => users.filter(user => user.id === userId)[0]),
            switchMap((user: UserInterface) => {
                if (!user.hasOwnProperty('accounts')) {
                    user = { ...user, accounts: [] };
                    newAccount = { ...newAccount, accountId: 1 }
                } else {
                    if (user.accounts.length > 0) {
                        let id = Math.max(...user.accounts.map(el => el.accountId));
                        newAccount = { ...newAccount, accountId: ++id }
                    }
                    else {
                        newAccount = { ...newAccount, accountId: 1 }
                    }
                }
                user.accounts.push(newAccount);
                return this.http.put(this.url + '/' + userId, user).pipe(
                    catchError((error) => throwError(`Server do not response. Error : ${error.toString()}`))
                );
            })
        )
    }

    deleteAccount(userId: number, accountId: number): Observable<any> {
        return this.http.get<UserInterface[]>(this.url).pipe(
            map((users: UserInterface[]) => users.filter(user => user.id === userId)[0]),
            switchMap((user: UserInterface) => {
                user.accounts = user.accounts.filter(account => account.accountId !== accountId);
                return this.http.put(this.url + '/' + userId, user).pipe(
                    catchError((error) => throwError(`Server do not response. Error : ${error.toString()}`))
                );
            })
        )
    }

    updateAccount(userId: number, newAccount: AccountInterface): Observable<any> {
        return this.http.get<UserInterface[]>(this.url).pipe(
            map((users: UserInterface[]) => users.filter(user => user.id === userId)[0]),
            switchMap((user: UserInterface) => {
                user.accounts = user.accounts.map(account => {
                    if (account.accountId === newAccount.accountId) {
                        return newAccount
                    }
                    return account;
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