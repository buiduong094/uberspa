import { ActionType as ContextAction } from 'store/context/ActionType';



import { ActionType } from './ActionType';

import { client, setToken } from 'api/client';
import { IState } from './InitState';


import { User } from 'models/user';
import { ConversationItem } from 'models/conversation';
import { Message } from '../../../models/message/index';
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

interface SendMessageAction {
    type: string,
    message: Message
}
interface ChangeTextAction {
    type: string,
    message: string
}
interface ShowModalAction {
    type: string,
    showModal: boolean
}
interface FieldChangeAction {
    type: string,
    fieldName: string,
    fieldValue?: any
}
interface RequestItemsAction {
    type: string,
    fieldName: string
}
interface ReceivedItemsAction {
    type: string;
    dataItems: any;
}

type KnownAction = RequestAction | ReceivedAction | CommitAction | CommitedAction  | SendMessageAction | ChangeTextAction | ShowModalAction | RequestItemsAction | ReceivedItemsAction | FieldChangeAction;


export const ActionCreators = {
    Loading: (dispatch: React.Dispatch<KnownAction>) => {
        dispatch({
            type: ActionType.LOADING
        });
        (async () => {

        })();
    },
    SendMessage : (dispatch: React.Dispatch<KnownAction>, message: Message) => {
        dispatch({
            type: ActionType.SEND_MESSAGE,
            message: message
        })
    },
    ChangeText: (dispatch: React.Dispatch<KnownAction>, message: string) => {
        dispatch({
            type: ActionType.CHANGE_TEXT,
            message: message
        })
    },
    ShowModal: (dispatch: React.Dispatch<KnownAction>, showModal: boolean) => {
        dispatch({
            type: ActionType.SHOW_MODAL,
            showModal: showModal
        })
    },
    FIELD_CHANGE: (dispatch: React.Dispatch<KnownAction>, fieldName: string, fieldValue: any) => {

        dispatch({
          type: ActionType.FIELD_CHANGE,
          fieldName: fieldName,
          fieldValue: fieldValue
        })
    },
    REQUEST_ITEMS: async (dispatch: React.Dispatch<KnownAction>, fieldName: string) => {
        dispatch({
            type: ActionType.REQUEST_ITEMS,
        });
        let URL
        if(fieldName  == "conversations") {
            URL = Endpoint.GET_LIST_MESSAGE
        } else if (fieldName  == "messageItems"){
            URL = Endpoint.GET_MESSAGE
        }
        let response = await client.post(URL, {server_key: SERVER_KEY});
        if(response && response.status == 200) {
            const data = response?.data.data;
            ActionCreators.FIELD_CHANGE(dispatch, fieldName, data)
            ActionCreators.FIELD_CHANGE(dispatch, "loading", false)
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
        case ActionType.SEND_MESSAGE:
            action = incomingAction as SendMessageAction;
            let msgItem = [...state.messageItems]
            msgItem.push(action.message)
            return {
                ...state,
                messageItems: msgItem,
                isSent: true
            }
        case ActionType.CHANGE_TEXT: 
            action = incomingAction as ChangeTextAction;            
            return {
                ...state,
                message: action.message,
                isSent: false
            }
        case ActionType.SHOW_MODAL: 
            action = incomingAction as ShowModalAction;            
            return {
                ...state,
                showModal: action.showModal
            }
        case ActionType.REQUEST_ITEMS:
            action = incomingAction as RequestItemsAction;
            return {
                ...state,
                loading: true
            };
        case ActionType.RECEIVED_ITEMS:
            action = incomingAction as ReceivedItemsAction;
            return {
                ...state,
                conversations: action.dataItems,
                loading: false
            }; 
        case ActionType.FIELD_CHANGE:
            action = incomingAction as FieldChangeAction;
            return {
                ...state,
                [action.fieldName]: action.fieldValue
            }; 

        default:
            return state
    }
}

