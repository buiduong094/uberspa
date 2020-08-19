import { Row } from 'models/form';

import { RelayPartyDetail, RelayParty, PassPhaseCert } from 'models/cert';
import { passRegExp, FieldName } from 'constant';
import { getString } from 'locales';

import * as Yup from 'yup';
 const changePasswordValidationSchema = Yup.object().shape({
    oldPassphrase: Yup
        .string()
        .required('Nhập mật khẩu chứng thư hiện tại'),

        newPassphrase: Yup
        .string()
        .matches(passRegExp,'Mật khẩu chứng thư yêu cầu tối thiểu 8 kí tự bao gồm: Viết hoa, viết thường, số và kí tự đặc biệt')
        .required(getString('validation', FieldName.RE_PASSWORD))
    ,
    repeatnewPassphrase: Yup
        .string()
        .required(getString('validation', FieldName.RE_PASSWORD))
        .matches(passRegExp,'Mật khẩu chứng thư  yêu cầu tối thiểu 8 kí tự bao gồm: Viết hoa, viết thường, số và kí tự đặc biệt')
        .oneOf([Yup.ref('newPassphrase'), null], 'Mật khẩu mới không khớp'),
});

export interface IState {

    listItems?: any,
    item?: any,
    relayParty?: RelayParty,
    relayPartyDetail?: RelayPartyDetail,
    passPhase?: PassPhaseCert,
    validation?: any,
    formSchemas: Row[],
    formDefault?: {},
    billCode?:string

}
export const InitState: IState =
{
    relayParty: {
        relyingParty: "CMCCA",
        language: "EN",
        rememberMe: true
    },
    relayPartyDetail: {
        certificates: "chain",
        certificateInfo: true,
        authenticationInfo: true,
        language: "EN"
    },
    validation: changePasswordValidationSchema,
    formDefault: {
        oldPassphrase: '',
        newPassphrase: '',
        repeatnewPassphrase: ''
    },
    formSchemas: [
        {
            controls: [
                {
                    fieldName: 'oldPassphrase',
                    label: '',
                    placeholder: 'Tài khoản',
                    type: 'text'
                }
            ]
        },
        {
            controls: [
                {
                    fieldName: 'newPassphrase',
                    label: '',
                    placeholder: 'Mật khẩu',
                    type: 'password',


                }
            ]
        },
        {
            controls: [
                {
                    fieldName: 'repeatnewPassphrase',
                    label: '',
                    placeholder: 'Mật khẩu',
                    type: 'password',
                }
            ]
        }
    ]

}  