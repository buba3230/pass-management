import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of, throwError } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { UserInterface } from "src/app/shared/types/interface/user-interface";
import { UserService } from "../service/user.service";
import {
    createUserAction, createUserFailureAction, createUserSuccessAction,
    updateUserAction, updateUserSuccessAction, updateUserFailureAction,
    getUserByIdAction, getUserByIdSuccessAction, getUserByIdFailureAction,
    getUserByInfoAction, getUserByInfoFailureAction,
} from "../actions/user.actions";
import { clearSessionStorage, setItem } from "../state/store";

@Injectable()
export class userEffects {
    create$ = createEffect(() =>
        this.actions$.pipe(
            ofType(createUserAction),
            switchMap(({ user }) => {
                return this.userService.createUser(user).pipe(
                    map((user: UserInterface) => {
                        return createUserSuccessAction({ user })
                    })
                )
            }),
            catchError((errorResponse: HttpErrorResponse) => {
                return of(createUserFailureAction(
                    { errors: errorResponse.error.errors }
                ))
            })
        )
    );

    update$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateUserAction),
            switchMap(({ user }) => {
                return this.userService.updateUser(user).pipe(
                    map((user: UserInterface) => {
                        return updateUserSuccessAction({ user })
                    })
                )
            }),
            catchError((errorResponse: HttpErrorResponse) => {
                return of(updateUserFailureAction(
                    { errors: errorResponse.error.errors }
                ))
            })
        )
    );

    getUserByInfo$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getUserByInfoAction),
            switchMap(({ user }) => {
                clearSessionStorage();
                return this.userService.getUserByInfo(user).pipe(
                    map((user: UserInterface) => {
                        return getUserByIdAction({ id: user ? user.id : 0 })
                    })
                )
            }),
            catchError((errorResponse: HttpErrorResponse) => {
                return of(getUserByInfoFailureAction(
                    { errors: errorResponse.error.errors }
                ))
            })
        )
    );

    getUserById$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getUserByIdAction),
            switchMap(({ id }) => {
                if (id === 0) {
                    return of(getUserByIdFailureAction(
                        { errors: 'Check your credentials...' }
                    ));
                }
                return this.userService.getUser(id).pipe(
                    map((user: UserInterface) => {
                        return getUserByIdSuccessAction({ user })
                    })
                )
            }),
            catchError((errorResponse: HttpErrorResponse) => {
                return of(getUserByIdFailureAction(
                    { errors: errorResponse.error.errors }
                ))
            })
        )
    );

    /* redirecting */
    redirectAfterCreating$ = createEffect(
        () => this.actions$.pipe(
            ofType(getUserByInfoFailureAction),
            tap(() => {
                this.router.navigateByUrl('/sign-in');
            })
        ),
        { dispatch: false }
    );

    redirectAfterSignIn$ = createEffect(
        () => this.actions$.pipe(
            ofType(getUserByIdSuccessAction),
            tap(({ user }) => {
                setItem('selectedUser', user)
                this.router.navigateByUrl('/dashboard');
            })
        ),
        { dispatch: false }
    );

    constructor(private userService: UserService, private actions$: Actions, private router: Router) { }
}