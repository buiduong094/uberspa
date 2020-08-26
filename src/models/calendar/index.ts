export enum TimeStage {
    Locked = 1,
    Available = 2,
    Choosing = 3
}
export interface CalendarTime {
    title?: string,
    stage?: TimeStage,
    key:string
}
export interface CalendarDate {
    date?: string,
    day?: string,
    month?: string,
    active?: boolean,
    year?:string,
    tDate?:Date,
    key?:string
}