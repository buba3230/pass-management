export interface AccountInterface {
    accountId: number;
    accountName: string;
    accountPassword: string;
}

export interface UserInterface {
    "id": number;
    "name": string;
    "email": string;
    "password": string;
    "accounts"?: AccountInterface[]
}