


import { ActionType } from './ActionType';

import { client, setToken } from 'api/client';
import { IState } from './InitState';
import { getMonday, dayOfWeekend } from 'utils/dateUltil';
import { CalendarDate } from 'models/calendar';



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


type KnownAction = RequestAction | ReceivedAction | FieldChangeAction;


export const ActionCreators = {
    Loading: (dispatch: React.Dispatch<KnownAction>) => {

        dispatch({
            type: ActionType.LOADING,

        });


    },

    FieldChange: (dispatch: React.Dispatch<KnownAction>, fieldName: string, fieldValue: any) => {

        dispatch({
            type: ActionType.FIELD_CHANGE,
            fieldName: fieldName,
            fieldValue: fieldValue
        });


    },
    REQUEST_ITEMS: async (dispatch: React.Dispatch<KnownAction>, state: IState) => {


    },

}
export const reducer = (state: IState, incomingAction: KnownAction): IState => {
    let action
    switch (incomingAction.type) {
        case ActionType.LOADING:
            let cals = new Array<CalendarDate>();
            let currentDate = new Date();
            const monday = getMonday();
            const mDate = monday.getDate();
            for (let i = 0; i < 7; i++) {

                let tDate = new Date(dayOfWeekend(i));


                let calDate: CalendarDate = {
                    day: tDate.getDay() == 0 ? 'CN' : `Thứ ${tDate.getDay() + 1}`,

                    date: `0${tDate.getDate()}`.substr(-2),
                    month: `Tháng ${(tDate.getMonth() + 1)}`,
                    active: currentDate.getDate() == tDate.getDate()
                }
                cals.push(calDate);

            }

            return {
                ...state,
                calender: cals,

            }
        case ActionType.REQUEST_ITEMS:
            action = incomingAction as RequestAction;
            return {
                ...state,

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

