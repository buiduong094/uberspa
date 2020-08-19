
import { Row } from 'models/form';



export enum Stage {
    ACTIVE_ACCOUNT,
    ACTIVE_SUCCESS,
    LOGIN,
    REGISTER,
    RESET_PASSWORD,
    RESET_PASSWORD_OTP
}
export interface FormStage {

    stage: Stage,
    title: string,
    descriptions: string,
    rows: Row[],

}

export const Forms: FormStage[] = [
    {
        stage: Stage.LOGIN,
        title: 'Login',
        descriptions: '',
        rows: [
            {
                controls: [
                    {
                        fieldName: 'email',
                        label: '',
                        placeholder: 'Email',
                        type: 'email-address'
                    }
                ]
            },
            {
                controls: [
                    {
                        fieldName: 'password',
                        label: '',
                        placeholder: 'Mật khẩu',
                        type: 'password'
                    }
                ]
            }
        ]

    },
    {
        stage: Stage.REGISTER,
        title: 'Register',
        descriptions: '',
        rows: [
            {
                controls: [
                    {
                        fieldName: 'name',
                        label: '',
                        placeholder: 'Tên hiển thị',
                        type: 'default',
                    }
                ]
            },
            {
                controls: [
                    {
                        fieldName: 'email',
                        label: '',
                        placeholder: 'Email',
                        type: 'default',
                    }
                ]
            },
            {
                controls: [
                    {
                        fieldName: 'phone',
                        label: '',
                        placeholder: 'Số điện thoại',
                        type: 'numeric',
                    }
                ]
            },
            {
                controls: [
                    {
                        fieldName: 'address',
                        label: '',
                        placeholder: 'Địa chỉ',
                        type: 'default',
                    }
                ]
            },
            {
                controls: [
                    {
                        fieldName: 'password',
                        label: '',
                        placeholder: 'Mật khẩu',
                        type: 'password'
                    }
                ]
            },
            {
                controls: [
                    {
                        fieldName: 'confirm_password',
                        label: '',
                        placeholder: 'Xác nhận lại mật khẩu',
                        type: 'password'
                    }
                ]
            }
        ]

    },
]
