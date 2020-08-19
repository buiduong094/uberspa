export enum TimeStage {
    Locked = 1,
    Available = 2,
    Choosing = 3
}
export interface CalendarTime {
    title?: string,
    stage?: TimeStage,
}
export interface CalendarDate {
    date?: string,
    day?: string,
    month?: string,
    active?: boolean
}