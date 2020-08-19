import { NotificationItem } from "models/notification";

export interface IState {
  items: Array<NotificationItem>
}
export const InitState: IState = {
  items: []
}