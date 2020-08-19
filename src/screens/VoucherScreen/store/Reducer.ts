import { ActionType as ContextAction } from 'store/context/ActionType';



import { ActionType } from './ActionType';

import { client, setToken } from 'api/client';
import { IState } from './InitState';


import { User } from 'models/user';
import { Endpoint } from 'api/endpoint';
import { SERVER_KEY } from 'constant';
import { VourcherType } from 'models/voucher';
interface RequestAction {
    type: string,
}
interface ReceivedAction {
    type: string,
    data: any
}
interface CommitAction {
    type: string,
    user?: User
}
interface CommitedAction {
    type: string,

    isLoggedIn: boolean
}

interface FieldChangeAction {
    type: string,
    fieldName: string,
    fieldValue?: any
}

interface ReceivedItemsAction {
    type: string;
    dataItems: any;
}

type KnownAction = RequestAction | ReceivedAction | CommitAction | CommitedAction | FieldChangeAction | ReceivedItemsAction;


export const ActionCreators = {
    Loading: (dispatch: React.Dispatch<KnownAction>) => {
        dispatch({
            type: ActionType.LOADING
        });
        (async () => {

            let response = await client.post(Endpoint.GET_COUPON_LIST, { server_key: SERVER_KEY });
            console.warn('ss', response)
            if (response && response.status == 200) {
                const data = response?.data.data;
                dispatch({
                    type: ActionType.RECEIVED_ITEMS,
                    dataItems: data,
                });
            }
        })();
    },
    FieldChange: (dispatch: React.Dispatch<KnownAction>, fieldName: string, fieldValue: any) => {
        dispatch({
            type: ActionType.FIELD_CHANGE,
            fieldName: fieldName,
            fieldValue: fieldValue
        })


    },

}
export const reducer = (state: IState, incomingAction: KnownAction): IState => {
    let action
    switch (incomingAction.type) {
        case ActionType.LOADING:
            action = incomingAction as CommitAction;
            return {
                ...state,
            };
        case ActionType.FIELD_CHANGE:
            action = incomingAction as FieldChangeAction;
            return {
                ...state,
                [action.fieldName]: action.fieldValue
            };
        case ActionType.RECEIVED_ITEMS:
            action = incomingAction as ReceivedItemsAction;
            return {
                ...state,
                items: action.dataItems,
                itemsUsed: (action.dataItems ?? []).filter(ite => ite.type === VourcherType.DASUDUNG),
                itemsNotUsed: (action.dataItems ?? []).filter(ite => ite.type === VourcherType.CHUASUDUNG),
            };
        default:
            return state
    }
}

