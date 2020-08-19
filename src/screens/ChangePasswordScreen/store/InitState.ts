import { Control } from 'models/form';
import { getString } from 'locales';
import { FieldName } from 'constant';
import { ChangePassword } from 'models/user'
import * as Yup from 'yup';
import { FormMessage } from 'models/message';

const numberRegex = /^[0-9]\d*$/;

export const validationPhone = Yup.object().shape({
  phone: Yup
    .string()
    .required('Cần nhập số điện thoại')
    .length(10, 'Số điện thoại không đúng định dạng')
    .matches(numberRegex, 'Số điện thoại không đúng định dạng')
})
export const validationPassword = Yup.object().shape({
  newPassword: Yup
    .string()
    .required('Cần nhập mật khẩu mới'),
  re_password: Yup
    .string()
    .required('Nhập lại mật khẩu mới')
    .oneOf([Yup.ref('newPassword'), null], 'Mật khẩu mới không khớp'),
})

export const ForgotPassword: Array<Control> =
  [
    {
      label: getString('auth', FieldName.PHONENUMBER),
      placeholder: getString('placeholder', FieldName.PHONENUMBER),
      fieldName: 'phone',
      type: 'text',
      keyboardType: 'numeric'

    },
    {
      label: getString('auth', FieldName.PASSWORD),
      placeholder: getString('placeholder', FieldName.PASSWORD),
      fieldName: 'newPassword',
      type: 'password',
      keyboardType: 'default'

    },
    {
      label: getString('auth', FieldName.RE_PASSWORD),
      placeholder: getString('placeholder', FieldName.RE_PASSWORD),
      fieldName: 're_password',
      type: 'password',
      keyboardType: 'default'

    },
  ]
export interface IState {
  step: number,
  controls: Array<Control>,
  commited?: boolean,
  message: FormMessage,
  validationSchema: Yup.ObjectSchema,
  initValues: ChangePassword,
  refCode1?: string,
  refCode2?: string,
  refCode3?: string,
  refCode4?: string,
  refCode5?: string,
  refCode6?: string,

}

export const InitState: IState = {
  step: 1,
  controls: ForgotPassword,
  commited: true,
  validationSchema: validationPhone,
  initValues: {
    phone: '',
  },
  message: {},
  refCode1: '',
  refCode2: '',
  refCode3: '',
  refCode4: '',
  refCode5: '',
  refCode6: ''
}