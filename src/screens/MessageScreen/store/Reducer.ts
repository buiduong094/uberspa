import { ActionType as ContextAction } from 'store/context/ActionType';



import { ActionType } from './ActionType';

import { client, setToken } from 'api/client';
import { IState } from './InitState';


import { User } from 'models/user';
import { ConversationItem } from 'models/conversation';
import { Message, GetChatEnum, MessageTypeEnum, FileItem } from '../../../models/message/index';
import { Endpoint } from 'api/endpoint';
import { SERVER_KEY } from 'constant';
import { stat } from 'fs';
import { CameraItem } from 'components/Camera/PhotoSelect';
import { Platform } from 'react-native';
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
    message: Message,
    images?: Array<CameraItem>
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
        message: Message,
        images?: CameraItem[]
    ) => {
        // dispatch({
        //     type: ActionType.FIELD_CHANGE,
        //     fieldName: 'loading',
        //     fieldValue: true
        // });
        let formData = new FormData();
        formData.append('server_key', SERVER_KEY)
        formData.append('to_id', (message.to_id ?? 0).toString())
        formData.append('text', unescape(encodeURIComponent(message.text ?? "")))
        const params = new Headers({
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "PUT, GET, POST",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
        })
        if ((images ?? []).length > 0) {
            images?.forEach((image, index) => {
                let f = image.url;
                const specFilename = f.lastIndexOf("/");
                let fileName = f.substr(specFilename + 1, f.length);
                if (!fileName.includes('.')) {
                    let currentTime = new Date().getMilliseconds();
                    fileName = `${currentTime}.png`;
                }

                let realPath = f;
                if (Platform.OS != 'android') {
                    realPath = f.replace('file://', '');
                }

                let fileBlob: any = {
                    name: fileName,
                    type: 'image/jpeg',
                    uri: realPath
                }
                formData.append('files[' + index + ']', fileBlob);
            })
        }

        let response = await client.post(Endpoint.SEND_MESSAGE, formData, params);
        if (response && response.status === 200) {
            const data = response?.data.data;
            console.warn('data', data)
            dispatch({
                type: ActionType.SEND_MESSAGE,
                message: data,
                images: images
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
        let body = {
        }
        let URL = "";
        if (type === GetChatEnum.CONVERSATIONS) {
            URL = Endpoint.GET_LIST_MESSAGE;
            body = {
                ...body,
                server_key: SERVER_KEY,
                limit: pageSize,
                time_order: timeFrom
            }
        } else if (type === GetChatEnum.MESSAGES) {
            URL = Endpoint.GET_MESSAGE;
            body = {
                ...body,
                server_key: SERVER_KEY,
                limit: pageSize,
                time_order: timeFrom,
                to_id: toId
            }
        }

        let response = await client.post(URL, body);
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

            sendedMessage.files = new Array<FileItem>();
            if ((action.images ?? []).length > 0) {

                action.images.forEach((img, index) => {
                    (sendedMessage.files ?? []).push({
                        id: index,
                        image_url: img.url
                    })
                })
            }
            listMessage.unshift(sendedMessage)
            return {
                ...state,
                messageItems: listMessage,
                isSent: true,
                images: [],
                videos: []
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

