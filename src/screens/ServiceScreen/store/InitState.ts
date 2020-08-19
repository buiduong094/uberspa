import { SearchItem } from "models/search";
import { SERVER_KEY } from "constant";
import { UberService } from "models/uberservice";



export interface IState {
  services: UberService[],
  searchBody?: SearchItem,
  commited?: boolean
}
export const InitState: IState = {
  searchBody: {
    page: 1,
    pagesize: 10,
    server_key: SERVER_KEY,
    name: ''
  },
  services: [
    //   {
    //       logo:'https://benhvienthucuc.vn/wp-content/themes/benh-vien-thu-cuc-vn/assets/images/sec12_1.png',
    //       name:'Thu Cúc Clinic',
    //       address:'Số 12 Nguyễn Văn Huy',
    //       distance:'1.0',
    //       star:3,
    //       rating:'3.2'
    //   },
    //   {
    //     logo:'https://benhvienthucuc.vn/wp-content/themes/benh-vien-thu-cuc-vn/assets/images/sec12_1.png',
    //     name:'Thu Cúc Clinic',
    //     address:'Số 12 Nguyễn Văn Huy',
    //     distance:'1.0',
    //     star:3,
    //     rating:'3.2'
    // },
    // {
    //     logo:'https://benhvienthucuc.vn/wp-content/themes/benh-vien-thu-cuc-vn/assets/images/sec12_1.png',
    //     name:'Thu Cúc Clinic',
    //     address:'Số 12 Nguyễn Văn Huy',
    //     distance:'1.0',
    //     star:3,
    //     rating:'3.2'
    // }
  ]
}