
import { ActionType } from './ActionType';

import { client, setToken } from 'api/client';
import { IState } from './InitState';

import { User } from 'models/user';
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
    isLoggedIn: boolean
}
interface FieldChangeAction {
    type: string,
    fieldName: string,
    fieldValue?: any
}
type KnownAction = RequestAction | ReceivedAction | CommitAction | CommitedAction | FieldChangeAction;


export const ActionCreators = {

    Loading: (dispatch: React.Dispatch<KnownAction>) => {
        dispatch({
            type: ActionType.LOADING
        });
        (async () => {

        })();

    },
    RequestItems: (dispatch: React.Dispatch<KnownAction>, state: IState) => {
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

        default:
            return state
    }
}

