import { Endpoint } from 'api/endpoint';
import { InitState, ContextState } from './InitState';
import { Reducer as ReduxReducer } from 'redux';
import { ActionType } from './ActionType';

import { ThunkAction } from 'store/configureAction';
import { client } from 'api/client';



interface LoadingAction {
    type: string
}
interface FieldChangeAction {
    type: string,
    fieldName: string,
    fieldValue?: any
}

export type KnowAction = LoadingAction | FieldChangeAction;

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
            console.log(response);
            if (response && response.data.status == 200) {
                let data = response.data.data.listServices as Array<any>;
                dispatch({
                    type: ActionType.FIELD_CHANGE,
                    fieldName: 'shopServices',
                    fieldValue: data
                })
            }

        })();
    },
    ShopByService: (): ThunkAction<KnowAction> => (dispatch, getState) => {
    },
    ServiceByShop: (shop: any): ThunkAction<KnowAction> => (dispatch, getState) => {
        (async () => {


            const response = await client.post(Endpoint.SHOP_SERVICE, { shop_id: shop.id });
            if (response && response.status == 200) {

            }
        })();
    },
    Booking: (): ThunkAction<KnowAction> => (dispatch, getState) => {
    },

    FieldChange: (fieldName: string, fieldValue: string): ThunkAction<KnowAction> => (dispatch, getState) => {

        dispatch({
            type: ActionType.FIELD_CHANGE,
            fieldName: fieldName,
            fieldValue: fieldValue
        });
    },

}

export const Reducer: ReduxReducer<ContextState, KnowAction> =
    (state: ContextState | undefined, incomingAction: KnowAction): ContextState => {
        if (state == undefined) {
            return InitState;
        }
        let action;
        switch (incomingAction.type) {

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

