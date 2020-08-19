import { KeyboardType } from 'react-native';
import { FormikHandlers, FormikProps } from "formik";

interface fieldProps {
    onChange: FormikHandlers['handleChange'],
    value: any,
    name: string
}
export interface TextInputUIProps {
    onSubmitEditing: Function,
    setRef: Function,
    type?: string,
    placeholder?: string,
    label?: string,
    onChange: () => void,
    value?: any,
    values: any,
    field: fieldProps,
    form: FormikProps<any>;
    isHideKeyboard?: boolean,
    keyboardType: KeyboardType,
    labelVisbile?:boolean,
    error: any,

}