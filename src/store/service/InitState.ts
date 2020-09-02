import { DialogMessage } from "models/message";

export interface State {
    shop?: any,
    activeServices?: any[],
    bookService?: any,
    shopServices?:any[],
    hasCoupon?: boolean,
    couponValid?: boolean,
    message?: DialogMessage,
    commited?: boolean,
    listShop?: any[],
    selectedService?: any
}
export const InitState: State =
{
    listShop: []
    
}