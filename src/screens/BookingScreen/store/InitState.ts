import { TagItem } from "models/tag";
import { BookingItem } from "models/booking";


export interface IState {
  tabItems?: Array<TagItem>,
  items: Array<BookingItem>,
  itemSelected?: BookingItem,
  listItems?: any,
  loading: boolean
}
export const InitState: IState = {
  loading: false,
  tabItems: [
    {
      selected: true,
      label: 'Đã đặt',
      key: '1'
    },
    {
      selected: false,
      label: 'Hoàn thành',
      key: '3'
    },
    {
      selected: false,
      label: 'Huỷ',
      key: '0'
    }
  ],
  items: [
    
  ]
}