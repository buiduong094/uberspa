import { ActionType as ContextAction } from 'store/context/ActionType';



import { ActionType } from './ActionType';

import { client, setToken } from 'api/client';
import { IState } from './InitState';


import { User } from 'models/user';
import { Endpoint } from 'api/endpoint';
import { SERVER_KEY } from 'constant';
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
interface RequestItemsAction {
    type: string,
}
interface ReceivedItemsAction {
    type: string;
    dataItems: any;
}
type KnownAction = RequestAction | ReceivedAction | CommitAction | CommitedAction | RequestItemsAction | ReceivedItemsAction;


export const ActionCreators = {
    Loading: (dispatch: React.Dispatch<KnownAction>) => {
        dispatch({
            type: ActionType.LOADING
        });
        (async () => {

        })();

    },
    REQUEST_ITEMS: async (dispatch: React.Dispatch<KnownAction>) => {
        dispatch({
            type: ActionType.REQUEST_ITEMS,
        });
        let response = await client.post(Endpoint.GET_NOTIFICATION, {server_key: SERVER_KEY});
        if(response && response.status == 200) {
            const data = response?.data.data;
            dispatch({
                type: ActionType.RECEIVED_ITEMS,
                dataItems: data,
            });
        } 
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
        case ActionType.REQUEST_ITEMS:
            action = incomingAction as RequestItemsAction;
            return {
                ...state,
            };
        case ActionType.RECEIVED_ITEMS:
            action = incomingAction as ReceivedItemsAction;
            return {
                ...state,
                items: action.dataItems,
            }; 
        default:
            return state
    }
}

