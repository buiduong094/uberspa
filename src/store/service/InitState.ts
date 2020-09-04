import { DialogMessage } from "models/message";
import { ConversationItem } from "models/conversation";

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
    selectedService?: any,
    introduce?: any[]
}
export const InitState: State =
{
    listShop: [],
    introduce: []
    
}