import { CalendarDate, CalendarTime } from 'models/calendar';
import { Endpoint } from 'api/endpoint';
import { InitState, State } from './InitState';
import { Reducer as ReduxReducer } from 'redux';
import { ActionType } from './ActionType';

import { ThunkAction } from 'store/configureAction';
import { client } from 'api/client';
import { formatDate } from 'utils/dateUltil';
import { DialogMessage, MessageType } from 'models/message';
import { SERVER_KEY } from 'constant';



interface LoadingAction {
    type: string
}
interface FieldChangeAction {
    type: string,
    fieldName: string,
    fieldValue?: any
}
interface CommitFormAction {
    type: string,
    message?: any

}

export type KnowAction = LoadingAction | FieldChangeAction | CommitFormAction;

export const ActionCreators = {
    Loading: (): ThunkAction<KnowAction> => (dispatch, getState) => {

        dispatch({ type: ActionType.LOADING });

    },
    LoggedIn: (isLoggedIn: boolean): ThunkAction<KnowAction> => (dispatch, getState) => {

        dispatch({
            type: ActionType.LOADING,

        })

    },
    Services: (): ThunkAction<KnowAction> => (dispatch, getState) => {
        (async () => {
            const response = await client.post(Endpoint.SEARCH_SERVICE, { page: 1, pagesize: 4 });

            if (response && response.data.status == 200) {
                let data = response.data.data.listServices as Array<any>;
                console.warn(data);
                dispatch({
                    type: ActionType.FIELD_CHANGE,
                    fieldName: 'activeServices',
                    fieldValue: data
                })
            }

        })();
    },
    ShopByService: (): ThunkAction<KnowAction> => (dispatch, getState) => {
        const queryBody = {
            server_key: SERVER_KEY,
            service_id: getState().ServiceState.selectedService?.id,
            latitude: 20.958021,
            longitude: 107.091785
        };
        (async () => {
            const response = await client.post(Endpoint.SHOP_BY_SERVICE, queryBody);
            if (response && response.status == 200) {

                let realData = response?.data?.data?.listShop??[];
                console.warn(realData)
               
                dispatch({
                    type: ActionType.FIELD_CHANGE,
                    fieldName: 'listShop',
                    fieldValue: realData,
                });
            }
        })();
    },
    ServiceByShop: (shop: any): ThunkAction<KnowAction> => (dispatch, getState) => {
        (async () => {

            dispatch({
                type: ActionType.FIELD_CHANGE,
                fieldName: 'shop',
                fieldValue: shop
            })
            const response = await client.post(Endpoint.SHOP_SERVICE, { shop_id: 1 });
            if (response && response.status == 200) {
                console.log(response);
                let data = response.data.data as Array<any>;
                dispatch({
                    type: ActionType.FIELD_CHANGE,
                    fieldName: 'shopServices',
                    fieldValue: data
                })

            }
        })();
    },
    Booking: (date: CalendarDate, time: CalendarTime, coupon?: string, description?: string): ThunkAction<KnowAction> => (dispatch, getState) => {
        (async () => {
            let message: DialogMessage = {
                type: MessageType.Loading,
                display: true,
            }
            dispatch({
                type: ActionType.FIELD_CHANGE,
                fieldName: 'message',
                fieldValue: message
            })
            const reduxState = getState().ServiceState;
            let bookingTime = time.key.split('-');
            let bookingDate = formatDate(date.tDate, 'yyyy-MM-dd');

            let booking = {
                services_id: reduxState.bookService.shop_services_id,
                date_time_booking_in: `${bookingDate} ${bookingTime[0]}`,
                date_time_booking_out: `${bookingDate} ${bookingTime[1]}`,
                shop_id: reduxState.shop.id,
                description: description,
                coupon: coupon

            }

            let response = await client.post(Endpoint.BOOKING, booking);


            if (response && response.status == 200) {

                if (response.data.status == '200') {
                    message.type = MessageType.Success;
                }
                dispatch({
                    type: ActionType.COMITED_FORM,
                    message: message,


                })
            }
        })();

    },
    CouponValid: (coupon: string): ThunkAction<KnowAction> => (dispatch, getState) => {
        (async () => {
            let message: DialogMessage = {
                type: MessageType.Loading,
                display: true,
            }
            dispatch({
                type: ActionType.FIELD_CHANGE,
                fieldName: 'message',
                fieldValue: message
            })
            const response = await client.post(Endpoint.COUPON_VALID, { ma_giam_gia: coupon });
            if (response && response.status == 200) {

                if (response && response.status == 200) {
                    const data = response.data;
                    if (data.status == '200') {
                        message.type = MessageType.Success;
                    }
                    else {
                        message.type = MessageType.Error;
                        message.message = data;
                    }
                    dispatch({
                        type: ActionType.COMITED_FORM,
                        message: message,


                    })
                }

            }

        })();
    },
    FieldChange: (fieldName: string, fieldValue: any): ThunkAction<KnowAction> => (dispatch, getState) => {
        dispatch({
            type: ActionType.FIELD_CHANGE,
            fieldName: fieldName,
            fieldValue: fieldValue
        });
    },

}

export const Reducer: ReduxReducer<State, KnowAction> =
    (state: State | undefined, incomingAction: KnowAction): State => {
        if (state == undefined) {
            return InitState;
        }
        let action;
        switch (incomingAction.type) {
            case ActionType.LOADING:
                return {
                    ...state,
                    commited: false,
                    hasCoupon: false,
                    couponValid: false,
                    message: undefined

                }
            case ActionType.COMITED_FORM:

                return {
                    ...state,
                    commited: false,
                    hasCoupon: false,
                    couponValid: false,

                }
            case ActionType.FIELD_CHANGE:
                action = incomingAction as FieldChangeAction;
                return {
                    ...state,
                    [action.fieldName]: action.fieldValue
                }
            default:
                return state;
        }

    }

