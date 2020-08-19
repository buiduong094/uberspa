import { ActionType as ContextAction } from 'store/context/ActionType';



import { ActionType } from './ActionType';

import { client, setToken } from 'api/client';


import { User } from 'models/user';
import { Endpoint } from 'api/endpoint';
import { SERVER_KEY } from 'constant';
import { UberService } from 'models/uberservice';
import { IState } from './InitState';
interface RequestAction {
    type: string,
}
interface ReceivedAction {
    type: string,
    data: any
}
interface CommitAction {
    type: string,
}
interface CommitedAction {
    type: string,
}

interface FieldChangeAction {
    type: string,
    fieldName: string,
    fieldValue?: any
}


type KnownAction = RequestAction | ReceivedAction | CommitAction | CommitedAction | FieldChangeAction;


export const ActionCreators = {
    FieldChange: (dispatch: React.Dispatch<KnownAction>, fieldName: string, fieldValue: any) => {
        dispatch({
            type: ActionType.FIELD_CHANGE,
            fieldName: fieldName,
            fieldValue: fieldValue
        });
    },
    QueryShop: (dispatch: React.Dispatch<KnownAction>, query: {}) => {
        const queryBody = {
            ...query,
            server_key: SERVER_KEY,
        };
        Promise.all([client.post(Endpoint.SEARCH_SHOP, queryBody)]).then(([response]) => {
            if (response && response.status == 200) {
                let realData = response?.data?.data?.listShop;
                dispatch({
                    type: ActionType.RECEIVE_ITEMS,
                    data: realData
                });
            }
        })
    }
}
export const reducer = (state: IState, incomingAction: KnownAction): IState => {
    let action
    switch (incomingAction.type) {
        case ActionType.FIELD_CHANGE:
            action = incomingAction as FieldChangeAction;
            return {
                ...state,
                searchBody:
                {
                    ...state.searchBody,
                    [action.fieldName]: action.fieldValue
                },
                // [action.fieldName]: action.fieldValue
            }
        case ActionType.RECEIVE_ITEMS:
            action = incomingAction as ReceivedAction;
            let data: UberService[] = action.data ?? [];

            data.forEach(item => {
                item.distance = parseFloat((item.distance ?? 0).toFixed(1));
                if (item.rating === null) {
                    item.rating = '0';
                }
                if (item.logo) {
                    item.logo = Endpoint.BASE_URL + "/" + item.logo;
                }
                if (!item?.star) {
                    item.star = 0;
                }
            })
            return {
                ...state,
                services: data,
                commited: true
            }
        default:
            return state
    }
}

