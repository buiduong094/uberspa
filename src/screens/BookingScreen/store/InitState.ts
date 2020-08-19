import { TagItem } from "models/tag";
import { BookingItem } from "models/booking";


export interface IState {
  tabItems?: Array<TagItem>,
  items: Array<BookingItem>,
  itemSelected?: BookingItem

}
export const InitState: IState = {
  tabItems: [
    {
      selected: true,
      label: 'Đang chờ',
      key: 'PENDING'
    },
    {
      selected: false,
      label: 'Đã đặt',
      key: 'CHECKIN'
    },
    {
      selected: false,
      label: 'Hoàn thành',
      key: 'COMPLETE'
    }
  ],
  items: [
    {
      id: 1,
      logo: 'https://benhvienthucuc.vn/wp-content/themes/benh-vien-thu-cuc-vn/assets/images/sec12_1.png',
      name: 'Thu Cúc Clinic 1',
      bookingDate: '06-05-2020/01:00 PM',
      bookingName: 'Gói 1 - Spa toàn diện',
    },
    {
      id: 2,
      logo: 'https://benhvienthucuc.vn/wp-content/themes/benh-vien-thu-cuc-vn/assets/images/sec12_1.png',
      name: 'Thu Cúc Clinic 2',
      bookingDate: '06-11-2020/02:00 PM',
      bookingName: 'Gói 2 - Spa cơ bản',
    },
    {
      id: 3,
      logo: 'https://benhvienthucuc.vn/wp-content/themes/benh-vien-thu-cuc-vn/assets/images/sec12_1.png',
      name: 'Thu Cúc Clinic 3',
      bookingDate: '12-05-2020/09:00 AM',
      bookingName: 'Gói 3 - Spa kết hợp',
    },
    {
      id: 4,
      logo: 'https://benhvienthucuc.vn/wp-content/themes/benh-vien-thu-cuc-vn/assets/images/sec12_1.png',
      name: 'Thu Cúc Clinic 4',
      bookingDate: '12-05-2020/09:00 AM',
      bookingName: 'Gói 3 - Spa kết hợp',
    },
  ]
}