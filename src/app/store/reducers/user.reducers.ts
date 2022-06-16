import { Action, createReducer, on } from "@ngrx/store";

import {
    createUserAction, createUserFailureAction, createUserSuccessAction,
    deleteAccountFailureAction,
    getUserByIdFailureAction,
    getUserByIdSuccessAction,
    updateAccountFailureAction,
    updateUserFailureAction,
    updateUserSuccessAction
} from "src/app/store/actions/user.actions";
import { getItem } from "../state/sessionStorage";
import { UserStateInterface } from "../types/userState.interface";

const initialState: UserStateInterface = {
    user: null,
    selectedUser: getItem('selectedUser'),
    error: null
}

const userReducer = createReducer(
    initialState,
    on(
        createUserAction,
        (state): UserStateInterface => ({
            ...state
        })
    ),
    on(
        createUserSuccessAction,
        (state, action): UserStateInterface => ({
            ...state,
            user: action.user,
            error: null
        })
    ),
    on(
        createUserFailureAction,
        (state, action): UserStateInterface => ({
            ...state,
            error: action.errors
        })
    ),
    on(
        getUserByIdSuccessAction,
        (state, action): UserStateInterface => {
            return {
                ...state,
                selectedUser: action.user,
                error: null
            }
        }
    ),
    on(
        getUserByIdFailureAction,
        (state, action): UserStateInterface => ({
            ...state,
            error: action.errors
        })
    ),
    on(
        updateUserSuccessAction,
        (state, action): UserStateInterface => ({
            ...state,
            selectedUser: action.user,
            error: null
        })
    ),
    on(
        updateUserFailureAction,
        (state, action): UserStateInterface => ({
            ...state,
            error: action.errors
        })
    ),
    on(
        deleteAccountFailureAction,
        (state, action): UserStateInterface => ({
            ...state,
            error: action.errors
        })
    ),
    on(
        updateAccountFailureAction,
        (state, action): UserStateInterface => ({
            ...state,
            error: action.errors
        })
    ),
)

export function reducers(state: UserStateInterface, action: Action) {
    return userReducer(state, action)
}
