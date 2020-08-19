
import { FieldName } from 'constant';
import { getString } from 'locales';
import * as Yup from 'yup';
import { Control } from 'models/form';
import { ChangeInfoUser, User } from 'models/user';


const numberRegex = /^[0-9]\d*$/;
export const validationSchema = Yup.object().shape({
  name: Yup
    .string()
    .required('Tên hiển thị không được để trống'),
    phone: Yup
    .string()
    .required('Số điện thoại không được để trống')
    .length(10, 'Số điện thoại không đúng định dạng')
    .matches(numberRegex, 'Số điện thoại không đúng định dạng'),
  address: Yup
    .string()
    .required('Địa chỉ không được để trống'),
    birth_day: Yup
    .string()
    .required('Ngày tháng năm sinh không được để trống'),
  // gender: Yup
  //   .string()
  //   .required('Giới tính không đươc để trống'),
});

export const FormChangeInfo: Array<Control> =
  [
    {
      label: getString('auth', FieldName.FULLNAME),
      placeholder: getString('placeholder', FieldName.FULLNAME),
      fieldName: 'name',
      type: 'text',
      keyboardType: 'default'

    },
    {
      label: getString('auth', FieldName.PHONENUMBER),
      placeholder: getString('placeholder', FieldName.PHONENUMBER),
      fieldName: 'phone',
      type: 'text',
      keyboardType: 'numeric'
    },
    {
      label: getString('auth', FieldName.ADDRESS),
      placeholder: getString('placeholder', FieldName.ADDRESS),
      fieldName: 'address',
      type: 'text',
      keyboardType: 'default'
    },
    {
      label: getString('auth', FieldName.BIRTHDAY),
      placeholder: getString('placeholder', FieldName.BIRTHDAY),
      fieldName: 'birth_day',
      type: 'text',
      keyboardType: 'default'
    },
    // {
    //   label: getString('auth', FieldName.GENDER),
    //   placeholder: getString('placeholder', FieldName.GENDER),
    //   fieldName: 'gender',
    //   type: 'text',
    //   keyboardType: 'default'
    // }

  ]

export interface IState {
  controls: Array<Control>,
  validationSchema: Yup.ObjectSchema,
  commited?: boolean,
  initValues?: ChangeInfoUser
  user?: User,
  message?: string,
  updateSuccess?: boolean
  
}
export const InitState: IState = {
  controls: FormChangeInfo,
  validationSchema: validationSchema,
  commited: true,
  user: {},
};
