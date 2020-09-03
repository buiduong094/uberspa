import { TagItem } from "models/tag";
import { UberService, } from "models/uberservice";
import { BookingItem } from "models/booking";


export interface IState {
  tabItems?: Array<TagItem>,
  services: Array<UberService>,
  items: Array<BookingItem>,
  introduce?: any
}
export const InitState: IState = {
  introduce: [],
  tabItems: [
    {
      selected: true,
      label: 'Giới thiệu',
      key: 'INTRODUCE'
    },
    {
      selected: false,
      label: 'Cơ sở',
      key: 'BASIC'
    },
    {
      selected: false,
      label: 'Tuyển dụng',
      key: 'RECRUITMENT'
    }
  ],
  services: [
    {
      logo:'https://benhvienthucuc.vn/wp-content/themes/benh-vien-thu-cuc-vn/assets/images/sec12_1.png',
      name:'Thu Cúc Clinic',
      address:'Số 12 Nguyễn Văn Huy',
      distance:'1.0',
      star:3,
      rating:'3.2'
    },
  ],
  items: [
    {
      logo: 'https://benhvienthucuc.vn/wp-content/themes/benh-vien-thu-cuc-vn/assets/images/sec12_1.png',
      name: 'Tuyển dụng bác sĩ răng hàm mặt',
      bookingDate: '06-05-2020/01:00 PM',
      bookingName: 'Gói 1 - Spa toàn diện'
    },
  ],
}