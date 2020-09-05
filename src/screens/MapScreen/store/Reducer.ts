


import { ActionType } from './ActionType';

import { client, setToken } from 'api/client';
import { IState } from './InitState';
import { Endpoint } from 'api/endpoint';



interface RequestAction {
    type: string,
    data?: any
}
interface ReceivedAction {
    type: string,
    data: any
}
interface FieldChangeAction {
    type: string,
    fieldName: string,
    fieldValue?: any
}

interface StepAction {
    type: string,
    step: number
}


type KnownAction = RequestAction | ReceivedAction | FieldChangeAction | StepAction;

export const ActionCreators = {
    FieldChange: (dispatch: React.Dispatch<KnownAction>, fieldName: string, fieldValue: any) => {
        dispatch({
            type: ActionType.FIELD_CHANGE,
            fieldName: fieldName,
            fieldValue: fieldValue
        });
    },
    REQUEST_ITEMS: async (dispatch: React.Dispatch<KnownAction>) => {
    },
    Loading: (dispatch: React.Dispatch<KnownAction>, bodySearch: any) => {
        Promise.all([
            client.post(Endpoint.SEARCH_SERVICE, bodySearch),
        ])
            .then(([response]) => {
                if (response && response.status == 200) {
                    let realData = response?.data?.data?.listServices;
                 
                    dispatch({
                        type: ActionType.RECEIVED_ITEMS,
                        data: realData,

                    })
                } else {
                    dispatch({
                        type: ActionType.RECEIVED_ITEMS,
                        data: []
                    });

                }

            })
            .catch((error) => {
                console.warn('error', error)
                dispatch({
                    type: ActionType.RECEIVED_ITEMS,
                    data: []
                });
            })

        dispatch({
            type: ActionType.LOADING,
        });
    },
    ChangeStep: (dispatch: React.Dispatch<KnownAction>, step: number) => {
        dispatch({
            type: ActionType.CHANGE_STEP,
            step: step
        });
    },
}
export const reducer = (state: IState, incomingAction: KnownAction): IState => {
    let action
    switch (incomingAction.type) {
        case ActionType.LOADING:
            return {
                ...state,
                step: 1
            }
        case ActionType.REQUEST_ITEMS:
            action = incomingAction as RequestAction;
            return {
                ...state,
            }
        case ActionType.FIELD_CHANGE:
            action = incomingAction as FieldChangeAction;
            if (action.fieldName == 'loadingConfirm') {
                return {
                    ...state,
                    loadingConfirm: action.fieldValue
                }
            }
            return {
                ...state,
                [action.fieldName]: [action.fieldValue]
            }
        case ActionType.CHANGE_STEP:
            action = incomingAction as StepAction;
            return {
                ...state,
                step: action.step
            }
        case ActionType.RECEIVED_ITEMS:
            action = incomingAction as ReceivedAction;
            return {
                ...state,
                // update ds dịch vụ ở đây
            }
        default:
            return state
    }
}

