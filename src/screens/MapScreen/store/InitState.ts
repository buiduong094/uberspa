
import { UberService } from "models/uberservice";
import { SERVER_KEY } from "constant";
import * as Yup from 'yup';

const numberRegex = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
const dateRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;



export const validationSchema = Yup.object().shape({
    date: Yup
    .string()
    .required('Ngày không được để trống')
    .matches(dateRegex, 'Ngày không đúng định dạng')
    ,
    time: Yup
    .string()
    .required('Thời gian không được để trống')
    .matches(numberRegex, 'Thời gian không đúng định dạng'),
});




export interface IState {
    display?: boolean,
    currentPossition?: number[]

    coordinates?: any[];
    step: number;
    services?: Array<UberService>;
 
    zoom: number,
    isExand: boolean,
    bodySearch: {},
    coupon?: string,
    description?: string, 
    date: string,
    time?: string
    item?: any,
    validationSchema: Yup.ObjectSchema,
}
export const InitState: IState = {
    display: true,
    coupon: '',
    description: '',
    step: 1,
    zoom: 16,
    isExand: false,
    date:'',
    item: {
        date: '',
        time: '',
    },
 
    bodySearch: {
        server_key: SERVER_KEY,
        name: '',
        page: 1,
        pagesize: 10
    },


    validationSchema: validationSchema,
}
