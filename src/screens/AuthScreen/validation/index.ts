import { Stage } from '../layouts';
import { FieldName } from 'constant';
import { getString } from 'locales';
import * as Yup from 'yup';



export const signInValidationSchema = Yup.object().shape({
    email: Yup
        .string()
        .required(getString('validation', FieldName.EMAIL)),

    password: Yup
        .string()
        .required(getString('validation', FieldName.PASSWORD)),
});
export const signUpIndividualValidationSchema = Yup.object().shape({
    name: Yup
        .string()
        .required(getString('validation', FieldName.FULLNAME)),
    email: Yup
        .string()
        .required(getString('validation', FieldName.EMAIL)),
    passport: Yup
        .string()
        .required(getString('validation', FieldName.PASSPORT)),
    repasssword: Yup
        .string()
        .required(getString('validation', FieldName.RE_PASSWORD)),
    password: Yup
        .string()
        .required(getString('validation', FieldName.PASSWORD)),
    phone: Yup
        .string()
        .required(getString('validation', FieldName.PHONENUMBER)),
});
export const signUpOrganizationValidationSchema = Yup.object().shape({
    name: Yup
        .string()
        .required(getString('validation', FieldName.FULLNAME)),
    email: Yup
        .string()
        .required(getString('validation', FieldName.EMAIL)),
    passport: Yup
        .string()
        .required(getString('validation', FieldName.PASSPORT)),
    password: Yup
        .string()
        .required(getString('validation', FieldName.PASSWORD)),
    phone: Yup
        .string()
        .required(getString('validation', FieldName.PHONENUMBER)),
});
export const validOTPValidationSchema = Yup.object().shape({
    email: Yup
        .string()
        .required('Email cannot be empty'),

    password: Yup
        .string()
        .required('Password cannot be empty'),
});
type AuthValidationSchemaForm = { [key in Stage]: any };
export const AuthValidationSchema: AuthValidationSchemaForm = {
    [Stage.LOGIN]: signInValidationSchema,
    [Stage.ACTIVE_ACCOUNT]: signUpIndividualValidationSchema,
    [Stage.ACTIVE_SUCCESS]: signUpOrganizationValidationSchema,
    [Stage.RESET_PASSWORD]: validOTPValidationSchema,
    [Stage.RESET_PASSWORD_OTP]: validOTPValidationSchema
}