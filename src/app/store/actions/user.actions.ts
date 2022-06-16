
import { createAction, props } from '@ngrx/store';
import { AccountInterface, UserInterface } from 'src/app/shared/types/interface/user-interface';
import { ActionTypes } from '../actionTypes';

/*create actions*/
export const createUserAction = createAction(
    ActionTypes.CREATE_USER,
    props<{ user: UserInterface }>()
)

export const createUserSuccessAction = createAction(
    ActionTypes.CREATE_USER_SUCCESS,
    props<{ user: UserInterface }>()
)

export const createUserFailureAction = createAction(
    ActionTypes.CREATE_USER_FAILURE,
    props<{ errors: string }>()
)

/*update actions*/
export const updateUserAction = createAction(
    ActionTypes.UPDATE_USER,
    props<{ user: UserInterface }>()
)

export const updateUserSuccessAction = createAction(
    ActionTypes.UPDATE_USER_SUCCESS,
    props<{ user: UserInterface }>()
)

export const updateUserFailureAction = createAction(
    ActionTypes.UPDATE_USER_FAILURE,
    props<{ errors: string }>()
)

/*get hero by id actions*/
export const getUserByIdAction = createAction(
    ActionTypes.GET_USER_BY_ID,
    props<{ id: number }>()
)

export const getUserByIdSuccessAction = createAction(
    ActionTypes.GET_USER_BY_ID_SUCCESS,
    props<{ user: UserInterface }>()
)

export const getUserByIdFailureAction = createAction(
    ActionTypes.GET_USER_BY_ID_FAILURE,
    props<{ errors: string }>()
)

/*get hero by info actions*/
//We dont need Success action, because with json DB we have to trigger getUserByIdAction when get user by info
export const getUserByInfoAction = createAction(
    ActionTypes.GET_USER_BY_INFO,
    props<{ user: UserInterface }>()
)

export const getUserByInfoFailureAction = createAction(
    ActionTypes.GET_USER_BY_INFO_FAILURE,
    props<{ errors: string }>()
)

/*accounts actions*/
//We dont need Success action, because with json DB we have to trigger updateUserSuccessAction when add account to user
export const createAccountAction = createAction(
    ActionTypes.CREATE_ACCOUNT,
    props<{ userId: number, account: AccountInterface }>()
)

export const createAccountFailureAction = createAction(
    ActionTypes.CREATE_ACCOUNT_FAILURE,
    props<{ errors: string }>()
)

export const deleteAccountAction = createAction(
    ActionTypes.DELETE_ACCOUNT,
    props<{ userId: number, accountId: number }>()
)

export const deleteAccountFailureAction = createAction(
    ActionTypes.DELETE_ACCOUNT_FAILURE,
    props<{ errors: string }>()
)

export const updateAccountAction = createAction(
    ActionTypes.UPDATE_ACCOUNT,
    props<{ userId: number, account: AccountInterface }>()
)

export const updateAccountFailureAction = createAction(
    ActionTypes.UPDATE_ACCOUNT_FAILURE,
    props<{ errors: string }>()
)