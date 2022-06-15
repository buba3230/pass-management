import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppStateInterface } from "src/app/store/types/appState.interface";
import { UserStateInterface } from "src/app/store/types/userState.interface";

export const userFeatureSelector = createFeatureSelector<
    AppStateInterface,
    UserStateInterface
>('user');

export const selectedUserByIdSelector = createSelector(
    userFeatureSelector,
    (userState: UserStateInterface) => userState.selectedUser
)

export const userErrorSelector = createSelector(
    userFeatureSelector,
    (userState: UserStateInterface) => userState.error
)
