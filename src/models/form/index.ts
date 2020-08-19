import { ImageSourcePropType, KeyboardType } from 'react-native';
export enum FormMode {
    AddNew = 1,
    Edit = 2,
    Detail = 3
}


export interface Control {
    label: string;
    placeholder?: string;
    fieldName: string;
    type: string;
    keyboardType?: KeyboardType;
    icon?: ImageSourcePropType | undefined;
    key?: string | number| undefined
}
export interface Row {
    controls: Control[]
}

export interface IForm {
  
    
    mode: FormMode,
    title:string,
    descriptions: string,

    rows: Row[],

}