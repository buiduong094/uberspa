import { LoginModel, RegisterModel  } from './../model/index';
import { ActionType as ContextActionType } from 'store/context/ActionType';
import { ActionType } from './ActionType';
import { client, setToken } from 'api/client';
import { IState } from './InitState';
import store from 'store/configureStore';
import { Endpoint } from 'api/endpoint';
import { FormMessage, MessageType } from 'models/message';
import { MessageDefine } from 'locales';
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
}
interface CommitedAction {
    type: string,
    data?: any,
    isLoggedIn: boolean
}
interface LoggedAction {
    type: string,
    isLoggedIn: boolean
}
interface StepAction {
    type: string,
    step: number
}
interface FieldChangeAction {
    type: string,
    fieldName: string,
    fieldValue: any
}
interface RegisterAction {
    type: string,
    data?: any,
    isSuccess: boolean,
    message?: string,
}
type KnownAction = RequestAction | ReceivedAction | CommitAction | CommitedAction | LoggedAction | StepAction | FieldChangeAction | RegisterAction;


export const ActionCreators = {

    LOGIN: (dispatch: React.Dispatch<KnownAction>, body: LoginModel) => {
        dispatch({
            type: ActionType.COMMITING_FORM
        });
        (async () => {
            let response = await client.login(Endpoint.LOGIN, body);
            if (response && response.status == 200) {
                let responseJson = await response.json();
                setToken(responseJson?.data?.access_token);

                store.dispatch({
                    type: ContextActionType.LOGGEDIN,
                    isLoggedIn: true
                })
                dispatch({
                    type: ActionType.COMMITED_FORM,
                    isLoggedIn: true
                })
                ActionCreators.UserDetail(dispatch);
            }
            else {
                dispatch({
                    type: ActionType.COMMITED_FORM,
                    isLoggedIn: false,
                })
            }
        })();

    },
    REGISTER: (dispatch: React.Dispatch<KnownAction>, body: RegisterModel) => {
        dispatch({
            type: ActionType.COMMITING_FORM
        });
        (async () => {
            let response = await client.post(Endpoint.CREATE_CUSTOMER, body);
            const {data, message} = response?.data;
            if(response && response.status == 200) {
                dispatch({
                    type: ActionType.REGISTER,
                    data: data,
                    isSuccess: true,
                    message: message
                })
            } else {
                dispatch({
                    type: ActionType.REGISTER,
                    isSuccess: false,
                    message: message
                })
            }
        })();
    },
    ChangeStep: (dispatch: React.Dispatch<KnownAction>, step: number) => {
        dispatch({
            type: ActionType.CHANGE_STEP,
            step: step
        });
    },
    FieldChange: (dispatch: React.Dispatch<KnownAction>, fieldName: string, fieldValue: any) => {
        dispatch({
            type: ActionType.FIELD_CHANGE,
            fieldName: fieldName,
            fieldValue: fieldValue
        })
    },
    UserDetail: (dispatch: React.Dispatch<KnownAction>) => {
       
        (async () => {
            let response = await client.post(Endpoint.USER_DETAIL, {server_key: SERVER_KEY});
            const {data, message} = response?.data;
            if(response && response.status == 200) {
                store.dispatch({
                    type: ContextActionType.FIELD_CHANGE,
                    fieldName: 'user',
                    fieldValue: data
                })
            }
        })();
    },
}
export const reducer = (state: IState, incomingAction: KnownAction): IState => {
    let action
    switch (incomingAction.type) {
        case ActionType.COMMITING_FORM:
            action = incomingAction as CommitAction;
            return {
                ...state,
                commited: false,
                message: undefined
            };
        case ActionType.COMMITED_FORM:
            action = incomingAction as CommitAction;
            if (action?.isLoggedIn) {
                return {
                    ...state,
                    isLoggedIn: action?.isLoggedIn,
                    commited: true,
                }
            } else {
                const message: FormMessage = {
                    display: true,
                    type: action.isLoggedIn ? MessageType.Success : MessageType.Error,
                    message: action.isLoggedIn ? '' : MessageDefine.LOGIN_FAIL
                }
                return {
                    ...state,
                    isLoggedIn: action?.isLoggedIn,
                    message: message,
                    commited: true,
                }
            }
        case ActionType.REGISTER:
            action = incomingAction as RegisterAction;
            const message: FormMessage = {
                display: true,
                type: action.isSuccess ? MessageType.Success : MessageType.Error,
                message: action.message
            }
            console.log('aaaaa', message)
                return {
                    ...state,
                    isSuccess: action?.isSuccess,
                    message: message,
                    commited: true,
                }

        case ActionType.RECEIVED_DATA:
            action = incomingAction as ReceivedAction

            return {
                ...state,
                loginModel: action.data
            }
        case ActionType.LOGGED:
            action = incomingAction as LoggedAction;

            return {
                ...state,
                isLoggedIn: action.isLoggedIn
            }
        case ActionType.CHANGE_STEP:
            action = incomingAction as StepAction;
            return {
                ...state,
                step: action.step
            }
        case ActionType.FIELD_CHANGE:

            action = incomingAction as FieldChangeAction;
            return {
                ...state,
                [action.fieldName]: action.fieldValue

            }
        default:
            return state
    }
}
