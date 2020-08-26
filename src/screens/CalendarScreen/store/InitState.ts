import { CalendarTime, TimeStage, CalendarDate } from 'models/calendar';
import { DialogMessage } from 'models/message';



export const DefaultTimeLine: Array<CalendarTime> = [
    {
        title: '08:00 AM',
        stage: TimeStage.Available,
        key: '08:00:00-08:30:00',

    },
    {
        title: '08:30 AM',
        stage: TimeStage.Available,
        key: '08:30:00-09:00:00',
    }
    , {
        title: '09:00 AM',
        stage: TimeStage.Available,
        key: '09:00:00-09:30:00',
    }
    
    , {
        title: '09:30 AM',
        stage: TimeStage.Available,
        key: '09:30:00-10:00:00',
    }
    , {
        title: '10:00 AM',
        stage: TimeStage.Available,
        key: '10:00:00-10:30:00',
    }
    , {
        title: '10:30 AM',
        stage: TimeStage.Available,
        key: '10:30:00-11:00:00',
    }
    , {
        title: '11:00 AM',
        stage: TimeStage.Available,
        key: '11:00:00-11:30:00',
    }

    , {
        title: '11:30 AM',
        stage: TimeStage.Available,
        key: '11:30:00-12:00:00',
    }
    , {
        title: '12:00 AM',
        stage: TimeStage.Available,
        key: '12:00:00-12:30:00',
    }
    , {
        title: '12:30 AM',
        stage: TimeStage.Available,
        key: '12:30:00-13:00:00',
    }
    , {
        title: '01:00 PM',
        stage: TimeStage.Available,
        key: '13:00:00-13:30:00',
    }
    , {
        title: '01:30 PM',
        stage: TimeStage.Available,
        key: '13:30:00-14:00:00',
    }
    , {
        title: '02:00 PM',
        stage: TimeStage.Available,
        key: '14:00:00-14:30:00',
    }
    , {
        title: '02:30 PM',
        stage: TimeStage.Available,
        key: '14:30:00-15:00:00',
    }
    , {
        title: '03:00 PM',
        stage: TimeStage.Available,
        key: '15:00:00-15:30:00',
    }
    , {
        title: '03:30 PM',
        stage: TimeStage.Available,
        key: '15:30:00-16:00:00',
    }
    , {
        title: '04:00 PM',
        stage: TimeStage.Available,
        key: '16:00:00-16:30:00',
    }

    , {
        title: '04:30 PM',
        stage: TimeStage.Available,
        key: '16:30:00-17:00:00',
    }
    , {
        title: '05:00 PM',
        stage: TimeStage.Available,
        key: '17:00:00-17:30:00',
    }
    , {
        title: '05:30 PM',
        stage: TimeStage.Available,
        key: '17:30:00-18:00:00',
    }
    , {
        title: '06:00 PM',
        stage: TimeStage.Available,
        key: '18:00:00-18:30:00',
    }
    , {
        title: '06:30 PM',
        stage: TimeStage.Available,
        key: '18:30:00-19:00:00',
    }
    , {
        title: '07:00 PM',
        stage: TimeStage.Available,
        key: '19:00:00-19:30:00',
    }
    , {
        title: '07:30 PM',
        stage: TimeStage.Available,
        key: '19:30:00-20:00:00',
    }
    , {
        title: '08:00 PM',
        stage: TimeStage.Available,
        key: '20:00:00-20:30:00',
    }
    , {
        title: '08:30 PM',
        stage: TimeStage.Available,
        key: '20:30:00-21:00:00',
    }
    , {
        title: '09:00 PM',
        stage: TimeStage.Available,
        key: '21:00:00-21:30:00',
    }
    , {
        title: '09:30 PM',
        stage: TimeStage.Available,
        key: '21:30:00-22:00:00',
    }
    , {
        title: '10:00 PM',
        stage: TimeStage.Available,
        key: '22:00:00-22:30:00',
    }
    , {
        title: '10:30 PM',
        stage: TimeStage.Available,
        key: '22:30:00-23:00:00',
    }
]
export interface IState {

    note: string,
    loading?: boolean,
    timeLine?: CalendarTime[],
    calender?: CalendarDate[],
    timeSelected?: CalendarTime,
    dateSelected?: CalendarDate,
    coupon?:string,
    description?: string,
    message?: DialogMessage

}

export const InitState: IState = {


    loading: true,
    note: 'Vui lòng chọn thời  gian sử dụng dịch vụ',

    timeLine: DefaultTimeLine
}