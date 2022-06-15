export interface DevicesInterface {
    deviceId: number;
    deviceName: string;
    devicePassword: string;
}

export interface UserInterface {
    "id": number;
    "name": string;
    "e-mail": string;
    "password": string;
    "devices"?: DevicesInterface[]
}