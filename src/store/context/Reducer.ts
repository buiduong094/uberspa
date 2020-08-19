import { Endpoint } from 'api/endpoint';
import { InitState, ContextState } from './InitState';
import { Reducer as ReduxReducer } from 'redux';
import { ActionType } from './ActionType';

import { ThunkAction } from 'store/configureAction';
import { User } from 'models/user';
import { client } from 'api/client';


interface ChangeConnectAction {
    type: string
    isConnection: boolean,
}
interface ChangeUserAction {
    type: string,
    user?: User
}
interface ChangeVersionAction {
    type: string,
    version?: any
}
interface ChangeLoggedAction {
    type: string,
    isLoggedIn?: boolean
}
interface RetrieveCodeAction {
    type: string,
    data: string
}

interface FieldChangeAction {
    type: string,
    fieldName: string,
    fieldValue?: any
}

export type KnowAction = ChangeUserAction | ChangeLoggedAction | ChangeConnectAction | ChangeVersionAction | RetrieveCodeAction | FieldChangeAction;

export const ActionCreators = {
    Loading: (): ThunkAction<KnowAction> => (dispatch, getState) => {

        dispatch({ type: ActionType.LOADING });

    },
    LoggedIn: (isLoggedIn: boolean): ThunkAction<KnowAction> => (dispatch, getState) => {

        dispatch({
            type: ActionType.LOGGEDIN,
            isLoggedIn: isLoggedIn
        })

    },
    ChangeUser: (user: User): ThunkAction<KnowAction> => (dispatch, getState) => {
        dispatch({
            type: ActionType.CHANGE_USER,
            user: user
        })
    },
    RetrieveCode: (): ThunkAction<KnowAction> => (dispatch, getState) => {
        const state = getState();

        // (async () => {
        //     const activeResp = await client.post(Endpoint.RetrievActiveCode, state.ContextState.activeBody);
        //     if (activeResp && activeResp.status == 200) {
        //         console.log(activeResp);
        //         const activeRespData = activeResp.data;
        //         if (activeRespData.responseCode == 0) {
        //             dispatch({
        //                 type: ActionType.RETRIEVECODE,
        //                 data: activeRespData.activationCode
        //             })
        //         }

        //     }

        // })();

    },
    LogOut: (): ThunkAction<KnowAction> => (dispatch, getState) => {
        (async () => {
            let response = await client.post(Endpoint.LOGOUT, {});
            if (response && response.status == 200) {
                dispatch({
                    type: ActionType.LOGOUT
                })
            }
        })();
    },
    FieldChange: (fieldName: string, fieldValue: string): ThunkAction<KnowAction> => (dispatch, getState) => {
        console.warn('fieldChange')
        dispatch({
            type: ActionType.FIELD_CHANGE,
            fieldName: fieldName,
            fieldValue: fieldValue
        });
    },
    ShowCamera: (showCamera: boolean): ThunkAction<KnowAction> => (dispatch, getState) => {
        dispatch({
            type: ActionType.FIELD_CHANGE,
            fieldName: 'showCamera',
            fieldValue: showCamera
        })
    },
    ChangeImage: (fieldValue: any, cameraTake?: boolean): ThunkAction<KnowAction> => (dispatch, getState) => {

        const state = getState();

        if (state.ContextState.fieldImage) {
            const fields = state.ContextState.fieldImage.split('.');
            const tmp = { ...state } as any;
            const images = tmp[fields[0]][fields[1]];
            let cloneImages = [...images ?? []];
            if (cameraTake) {
                cloneImages.push(fieldValue);
            }
            else {
                cloneImages = cloneImages.concat(fieldValue);
            }
            dispatch({
                type: ActionType.FIELD_CHANGE,

                fieldName: state.ContextState.fieldImage,
                fieldValue: cloneImages
            })
        }

    },
}

export const Reducer: ReduxReducer<ContextState, KnowAction> =
    (state: ContextState | undefined, incomingAction: KnowAction): ContextState => {
        if (state == undefined) {
            return InitState;
        }
        let action;
        switch (incomingAction.type) {
            case ActionType.CHANGE_CONNECTION:
                action = incomingAction as ChangeConnectAction;
                return {
                    ...state,
                    isConnection: action.isConnection
                };
            case ActionType.CHANGE_VERSION:
                action = incomingAction as ChangeVersionAction;
                return {
                    ...state,
                    version: action.version
                };
            case ActionType.CHANGE_USER:
                action = incomingAction as ChangeUserAction;
                return {
                    ...state,
                    user: action.user
                }
            case ActionType.LOGGEDIN:

                action = incomingAction as ChangeLoggedAction;
                return {
                    ...state,
                    isLoggedIn: true
                }
            case ActionType.RETRIEVECODE:
                action = incomingAction as RetrieveCodeAction;
                return {
                    ...state,
                    activeCode: action.data
                }
            case ActionType.LOGOUT:
                return {
                    ...state,
                    user: {
                        email: '',
                        phone: '',
                        name: ''
                    },
                    isLoggedIn: false
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

