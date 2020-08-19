
import { User } from "models/user";

export const DataType = {
    Login: 'Login',
    Employee: 'Employee',

}
export interface LoginModel {
    email: string,
    password: string,
    server_key: string,
    remember: number
}

export interface RegisterModel {
    email: string,
    name: string,
    address: string,
    password: string,
    phone: string,
    server_key: string,
    confirm_password: string,
}
