import { UserInterface } from 'src/app/shared/types/interface/user-interface';

export interface UserStateInterface {
    selectedUser: UserInterface | null;
    user: UserInterface | null;
    error: String | null;
}