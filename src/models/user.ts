
export interface User {
    email?: string,
    name?: string,
    phone?: string,
    avatar?: any, // source profile image
    is_notification?: NotifyReceiveType,
    id?: number
}
export interface ChangeInfoUser {
    name: string,
    phone: string,
    address: string,
    birth_day: string,
    gender: string,
    id?: number
}

export interface ChangePassword {
    phone: string,
    newPassword?: string,
    re_password?: string,
}

export enum NotifyReceiveType {
    INACTIVE = 0,
    ACTIVE = 1
}
