
import { UberService } from "models/uberservice";
import { SERVER_KEY } from "constant";

export interface IState {
    display?: boolean,
    currentPossition?: number[]

    coordinates?: any[];
    step: number;
    services?: Array<UberService>;
 
  
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
date:'',
 
    bodySearch: {
        server_key: SERVER_KEY,
        name: '',
        page: 1,
        pagesize: 10
    }
}