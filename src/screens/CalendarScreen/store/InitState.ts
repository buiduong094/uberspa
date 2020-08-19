import { CalendarTime, TimeStage, CalendarDate } from 'models/calendar';



export const  DefaultTimeLine : Array<CalendarTime> = [
    {
        title: '08:00 AM',
        stage: TimeStage.Available,
    },
    {
        title: '08:30 AM',
        stage: TimeStage.Available,
    }
    , {
        title: '09:00 AM',
        stage: TimeStage.Available,
    }
    , {
        title: '09:00 AM',
        stage: TimeStage.Available,
    }
    , {
        title: '09:30 AM',
        stage: TimeStage.Available,
    }
    , {
        title: '10:00 AM',
        stage: TimeStage.Available,
    }
    , {
        title: '10:30 AM',
        stage: TimeStage.Available,
    }
    , {
        title: '11:00 AM',
        stage: TimeStage.Available,
    }
    , {
        title: '11:30 AM',
        stage: TimeStage.Available,
    }
    , {
        title: '12:00 AM',
        stage: TimeStage.Available,
    }
    , {
        title: '12:30 AM',
        stage: TimeStage.Available,
    }
    , {
        title: '01:00 PM',
        stage: TimeStage.Locked,
    }
    , {
        title: '01:30 PM',
        stage: TimeStage.Available,
    }
    , {
        title: '02:00 PM',
        stage: TimeStage.Locked,
    }
    , {
        title: '02:30 PM',
        stage: TimeStage.Available,
    }
    , {
        title: '03:00 PM',
        stage: TimeStage.Available,
    }
    , {
        title: '03:30 PM',
        stage: TimeStage.Available,
    }
    , {
        title: '04:00 PM',
        stage: TimeStage.Available,
    }
    , {
        title: '04:30 PM',
        stage: TimeStage.Available,
    }
    , {
        title: '05:00 PM',
        stage: TimeStage.Available,
    }
    , {
        title: '05:30 PM',
        stage: TimeStage.Available,
    }
    , {
        title: '06:00 PM',
        stage: TimeStage.Available,
    }
    , {
        title: '06:30 PM',
        stage: TimeStage.Available,
    }
    , {
        title: '07:00 PM',
        stage: TimeStage.Available,
    }
    , {
        title: '07:30 PM',
        stage: TimeStage.Available,
    }
    , {
        title: '08:00 PM',
        stage: TimeStage.Available,
    }
    , {
        title: '08:30 PM',
        stage: TimeStage.Available,
    }
    , {
        title: '09:00 PM',
        stage: TimeStage.Available,
    }
    , {
        title: '09:30 PM',
        stage: TimeStage.Available,
    }
    , {
        title: '10:00 PM',
        stage: TimeStage.Available,
    }
    , {
        title: '10:30 PM',
        stage: TimeStage.Available,
    }
]
export interface IState {

    note: string,
    loading?: boolean,
    timeLine?: CalendarTime[],
    calender?: CalendarDate[]

}

export const InitState: IState = {


    loading: true,
    note: 'Vui lòng chọn thời  gian sử dụng dịch vụ',
    
    timeLine: DefaultTimeLine
}