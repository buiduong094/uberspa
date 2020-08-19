
import { ActionType } from './ActionType';

import { client, setToken } from 'api/client';
import { IState } from './InitState';
import { Endpoint } from 'api/endpoint';

import { User } from 'models/user';
import { FormMessage, MessageType } from 'models/message';
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
    data?: any,
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
type KnownAction = RequestAction | ReceivedAction | CommitAction | CommitedAction | StepAction | FieldChangeAction;


export const ActionCreators = {

    Loading: (dispatch: React.Dispatch<KnownAction>) => {
        dispatch({
            type: ActionType.LOADING
        });
    },
    CHANGE_PASSWORD: (dispatch: React.Dispatch<KnownAction>, body: any) => {
        (async () => {
            let response = await client.post(Endpoint.CHANGE_PASSWORD, body);
            if (response && response.status == 200) {
                const data = response.data.status
                dispatch({
                    type: ActionType.COMMITED_FORM,
                    data: data
                })

            }
        })();


    },
    RequestItems: (dispatch: React.Dispatch<KnownAction>, state: IState) => {
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

}
export const reducer = (state: IState, incomingAction: KnownAction): IState => {
    let action
    switch (incomingAction.type) {
        case ActionType.LOADING:
            action = incomingAction as CommitAction;
            return {
                ...state,
            };
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
        case ActionType.COMMITED_FORM:
            action = incomingAction as CommitedAction;
            const status = action.data
            // console.log('AA', status)
            const message: FormMessage = {
                display: true,
                type: status.code == 500 ? MessageType.Error : MessageType.Success,
                message: status.message
            }

            return {
                ...state,
                commited: true,
                message: message
            }


        default:
            return state
    }
}

