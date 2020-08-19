
import { Forms, Stage, FormStage } from "../layouts";
import { LoginModel, RegisterModel } from "../model";
import { FormMessage } from "models/message";
import * as Yup from 'yup';
import { Control } from "models/form";
import { SERVER_KEY } from "constant";
export interface IState {
    stage: Stage,
    forms: FormStage[],
    loginModel?: LoginModel,
    registerModel?: RegisterModel,
    isLoggedIn?: boolean,
    commited?: boolean,
    message?: FormMessage,
    validationLoginSchema: Yup.ObjectSchema,
    validationRegisterSchema: Yup.ObjectSchema,
    step: number,
    refCode1: string,
    refCode2: string,
    refCode3: string,
    refCode4: string,
    refCode5: string,
    refCode6: string,
    isSuccess?: boolean,
}

export const validationLoginSchema = Yup.object().shape({
    email: Yup
        .string()
        .required('Email không được để trống').email('Định dạng email không đúng'),
    password: Yup
        .string()
        .required('Mật khẩu không được để trống'),
}
);

export const validationRegisterSchema = Yup.object().shape({
    phone: Yup
        .string()
        .required('Số điện thoại không được để trống'),
    password: Yup
        .string()
        .required('Mật khẩu không được để trống'),
    address: Yup
        .string()
        .required('Địa chỉ không được để trống'),
    name: Yup
        .string()
        .required('Tên hiển thị không được để trống'),
    email: Yup
        .string()
        .required('Email không được để trống').email('Định dạng email không đúng'),
    confirm_password: Yup
        .string()
        .required()
        .oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp'),
}
);

export const InitState: IState = {
    step: 1,
    stage: Stage.LOGIN,
    forms: Forms,
    validationLoginSchema: validationLoginSchema,
    validationRegisterSchema: validationRegisterSchema,
    loginModel: {
        // email: 'xuansoncp945@gmail.com',
        email: 'chibao270489@gmail.com',
        password: '123456',
        // password: '',
        server_key: SERVER_KEY,
        remember: 1
    },
    registerModel: {
        address: '',
        email: '',
        password: '',
        name: '',
        phone: '',
        server_key: SERVER_KEY,
        confirm_password: ''
    },
    refCode1: '',
    refCode2: '',
    refCode3: '',
    refCode4: '',
    refCode5: '',
    refCode6: ''

}