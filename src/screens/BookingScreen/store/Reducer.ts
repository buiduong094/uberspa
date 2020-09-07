
import { ActionType } from './ActionType';

import { client, setToken } from 'api/client';
import { IState } from './InitState';

import { User } from 'models/user';
import { BookingItem } from '../../../models/booking/index';
import { Endpoint } from 'api/endpoint';
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
interface DeleteAction {
    type: string,
    id: number,
}
interface SelectAction {
    type: string,
    itemSelected: BookingItem
}
type KnownAction = RequestAction | ReceivedAction | CommitAction | CommitedAction | FieldChangeAction | DeleteAction | SelectAction;


export const ActionCreators = {

    Loading: (dispatch: React.Dispatch<KnownAction>) => {


    },
    RequestItems: (dispatch: React.Dispatch<KnownAction>, key: number) => {
        (async () => {

            dispatch({
                type: ActionType.FIELD_CHANGE,
                fieldName: 'items',
                fieldValue: []
            })
            dispatch({
                type: ActionType.FIELD_CHANGE,
                fieldName: 'loading',
                fieldValue: true
            })
            const response = await client.post(Endpoint.BOOKING_LIST, { status: key });
            dispatch({
                type: ActionType.FIELD_CHANGE,
                fieldName: 'loading',
                fieldValue: false
            })
            if (response && response.status == 200) {

                let data = response.data.data as Array<any>;
                console.log(data);
                dispatch({
                    type: ActionType.FIELD_CHANGE,
                    fieldName: 'items',
                    fieldValue: data
                })

            }
        })();
    },
    FieldChange: (dispatch: React.Dispatch<KnownAction>, fieldName: string, fieldValue: any) => {
        dispatch({
            type: ActionType.FIELD_CHANGE,
            fieldName: fieldName,
            fieldValue: fieldValue
        })
    },
    CancelBooking: (dispatch: React.Dispatch<KnownAction>, id?: number) => {
        dispatch({
            type: ActionType.DELETE_ITEM,
            id: id,
        })
    },
    SelectItem: (dispatch: React.Dispatch<KnownAction>, itemSelected: BookingItem) => {
        dispatch({
            type: ActionType.SELECT_ITEM,
            itemSelected: itemSelected,
        })
    }

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
        case ActionType.DELETE_ITEM:
            action = incomingAction as DeleteAction;
            let data = [...state.items]
            const index = data.findIndex(elem => elem.id === action.id)
            if (index !== -1) {
                data.splice(index, 1)
            }
            return {
                ...state,
                itemSelected: undefined,
                items: [...data],
            };
        case ActionType.SELECT_ITEM:
            action = incomingAction as SelectAction;
            return {
                ...state,
                itemSelected: action.itemSelected
            };

        default:
            return state
    }
}

