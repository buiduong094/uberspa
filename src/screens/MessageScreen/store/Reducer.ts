import { ActionType as ContextAction } from 'store/context/ActionType';



import { ActionType } from './ActionType';

import { client, setToken } from 'api/client';
import { IState } from './InitState';


import { User } from 'models/user';
import { ConversationItem } from 'models/conversation';
import { Message, GetChatEnum, MessageTypeEnum } from '../../../models/message/index';
import { Endpoint } from 'api/endpoint';
import { SERVER_KEY } from 'constant';
import { stat } from 'fs';
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
    typeGet: GetChatEnum;
}

type KnownAction = RequestAction | ReceivedAction | CommitAction | CommitedAction | SendMessageAction | ChangeTextAction | ShowModalAction | RequestItemsAction | ReceivedItemsAction | FieldChangeAction;


export const ActionCreators = {
    Loading: (dispatch: React.Dispatch<KnownAction>) => {
        dispatch({
            type: ActionType.LOADING
        });
    },
    SendMessage: async (
        dispatch: React.Dispatch<KnownAction>,
        type: MessageTypeEnum,
        message: Message) => {
        const params = {
            server_key: SERVER_KEY,
            to_id: message.to_id,
            text: unescape(encodeURIComponent(message.text ?? "")) // mã hóa nếu có emoj
        }
        let response = await client.post(Endpoint.SEND_MESSAGE, params);
        if (response && response.status === 200) {
            const data = response?.data.data;
            dispatch({
                type: ActionType.SEND_MESSAGE,
                message: data
            })
        }

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
    REQUEST_ITEMS: async (
        dispatch: React.Dispatch<KnownAction>,
        type: GetChatEnum,
        timeFrom: number,
        pageSize: number,
        toId?: number
    ) => {
        dispatch({
            type: ActionType.REQUEST_ITEMS,
        });
        let params = {
        }
        let URL = "";
        if (type === GetChatEnum.CONVERSATIONS) {
            URL = Endpoint.GET_LIST_MESSAGE;
            params = {
                ...params,
                server_key: SERVER_KEY,
                limit: pageSize,
                time_order: timeFrom
            }
        } else if (type === GetChatEnum.MESSAGES) {
            URL = Endpoint.GET_MESSAGE;
            params = {
                ...params,
                server_key: SERVER_KEY,
                limit: pageSize,
                time_order: timeFrom,
                to_id: toId
            }
        }

        let response = await client.post(URL, params);
        if (response && response.status === 200) {
            const data = response?.data.data;
            dispatch({
                type: ActionType.RECEIVED_ITEMS,
                dataItems: data,
                typeGet: type
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
        case ActionType.SEND_MESSAGE:
            action = incomingAction as SendMessageAction;
            let listMessage = [...state.messageItems];
            let sendedMessage = action.message as Message;
            try {
                let decodeMessage = decodeURIComponent(escape(sendedMessage.text ?? ""));
                sendedMessage.text = decodeMessage;
            } catch (error) {
                sendedMessage.text = sendedMessage.text;
            }
            listMessage.unshift(sendedMessage)
            return {
                ...state,
                messageItems: listMessage,
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
            const dataLength = (action.dataItems ?? []).length;
            if (action.typeGet === GetChatEnum.CONVERSATIONS) {
                let data = action.dataItems as Array<ConversationItem>;
                let listConversation = new Array<ConversationItem>();
               
                if (state.timeFrom === 0) {
                    listConversation = data;
                } else {
                    listConversation = state.conversations.concat(data);
                }
                let newTimeFrom = state.timeFrom;
                if (dataLength > 0) {
                    newTimeFrom = action.dataItems[dataLength - 1]?.time ?? 0
                }
                return {
                    ...state,
                    loading: false,
                    conversations: listConversation,
                    timeFrom: newTimeFrom,
                    canLoadMore: dataLength === 0 ? false : true,
                };
            } else { // get ds tin nhắn
                let data = action.dataItems as Array<Message>;
                let listMessage = new Array<Message>();
                data.forEach(item => {
                    try {
                        let decodeMessage = decodeURIComponent(escape(item.text ?? "")); // giải mã
                        item.text = decodeMessage;
                    } catch (error) {
                        item.text = item.text;
                    }
                });
                if (state.timeFrom === 0) {
                    listMessage = data;
                } else {
                    listMessage = state.messageItems.concat(data);
                }
                let newTimeFrom = state.timeFrom;
                if (dataLength > 0) {
                    newTimeFrom = action.dataItems[dataLength - 1]?.time ?? 0
                }
                return {
                    ...state,
                    loading: false,
                    messageItems: listMessage,
                    timeFrom: newTimeFrom,
                    canLoadMore: dataLength === 0 ? false : true,
                };
            }
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

