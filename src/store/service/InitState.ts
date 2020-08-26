import { DialogMessage } from "models/message";

export interface State {
    shop?: any,
    activeServices?: any[],
    bookService?: any,
    shopServices?:any[],
    hasCoupon?: boolean,
    couponValid?: boolean,
    message?: DialogMessage,
    commited?: boolean

}
export const InitState: State =
{

    
}