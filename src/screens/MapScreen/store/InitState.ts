
import { UberService } from "models/uberservice";
import { SERVER_KEY } from "constant";

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
}
export const InitState: IState = {
    display: true,
    coupon: '',
    step: 1,
    zoom: 16,
    isExand: false,
date:'',
 
    bodySearch: {
        server_key: SERVER_KEY,
        name: '',
        page: 1,
        pagesize: 10
    }
}