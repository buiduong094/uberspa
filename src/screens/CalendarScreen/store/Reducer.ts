


import { ActionType } from './ActionType';

import { client, setToken } from 'api/client';
import { IState } from './InitState';
import { getMonday, dayOfWeekend } from 'utils/dateUltil';
import { CalendarDate, CalendarTime, TimeStage } from 'models/calendar';
import store from 'store/configureStore';
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
interface TimeChoiceAction {
    type: string,
    timeChoice: CalendarTime,
    timeLine: CalendarTime[]
}
interface DateChoiceAction {
    type: string,
    dateSelected: CalendarDate,
    calendar: CalendarDate[]
}



type KnownAction = RequestAction | ReceivedAction | FieldChangeAction | TimeChoiceAction |DateChoiceAction;


export const ActionCreators = {
    Loading: (dispatch: React.Dispatch<KnownAction>) => {

        dispatch({
            type: ActionType.LOADING,

        });
    },
    DateChoice: (dispatch: React.Dispatch<KnownAction>, item: CalendarDate, state: IState) => {
        let cloneCalendar = state.calender?.slice() ?? [];

        let selectItem = cloneCalendar.find(e => e.key == item.key);
        let selectedItems = cloneCalendar.filter(e => e.active == true);
        selectedItems.forEach((choice) => {
            choice.active = false
        })
        if (selectItem) {
            selectItem.active = true;
            dispatch({
                type: ActionType.DATE_CHOICE,
                dateSelected: selectItem,
                calendar: cloneCalendar
            });
        }
        },
    TimeChoice: (dispatch: React.Dispatch<KnownAction>, item: CalendarTime, state: IState) => {
        let cloneTimeLine = state.timeLine?.slice() ?? [];

        let selectItem = cloneTimeLine.find(e => e.key == item.key);
        let selectedItems = cloneTimeLine.filter(e => e.stage == TimeStage.Choosing);
        selectedItems.forEach((choice) => {
            choice.stage = TimeStage.Available;
        })
        if (selectItem) {
            if (selectItem.stage == TimeStage.Available) {
                selectItem.stage = TimeStage.Choosing;
            }
            else {
                selectItem.stage = TimeStage.Available;
            }
            dispatch({
                type: ActionType.TIME_CHOICE,
                timeChoice: selectItem,
                timeLine: cloneTimeLine
            });
        }
    },
    FieldChange: (dispatch: React.Dispatch<KnownAction>, fieldName: string, fieldValue: any) => {
        dispatch({
            type: ActionType.FIELD_CHANGE,
            fieldName: fieldName,
            fieldValue: fieldValue
        });
    },
}
export const reducer = (state: IState, incomingAction: KnownAction): IState => {
    let action
    switch (incomingAction.type) {
        case ActionType.LOADING:
            let cals = new Array<CalendarDate>();
            let currentDate = new Date();
            // const monday = getMonday();
            // const mDate = monday.getDate();
            let dateSelected;
            for (let i = 0; i < 7; i++) {
                let tDate = new Date(dayOfWeekend(i));
                let calDate: CalendarDate = {
                    day: tDate.getDay() == 0 ? 'CN' : `Thứ ${tDate.getDay() + 1}`,

                    date: `0${tDate.getDate()}`.substr(-2),
                    month: `Tháng ${(tDate.getMonth() + 1)}`,
                    active: currentDate.getDate() == tDate.getDate(),
                    tDate: tDate,
                    key: `${tDate.getFullYear()}${tDate.getMonth()}${tDate.getDate()}`
                }
                if (calDate.active) {
                    dateSelected = calDate;
                }
                cals.push(calDate);
            }

            return {
                ...state,
                calender: cals,
                dateSelected: dateSelected,
           

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
        case ActionType.TIME_CHOICE:
            action = incomingAction as TimeChoiceAction;
            return {
                ...state,
                timeSelected: action.timeChoice,
                timeLine: action.timeLine,
            }
            case ActionType.DATE_CHOICE:
                action = incomingAction as DateChoiceAction;
                return {
                    ...state,
                    dateSelected: action.dateSelected,
                    calender: action.calendar,
                }
            default:
            return state
    }
}

