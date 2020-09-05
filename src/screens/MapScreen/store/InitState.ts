
import { UberService } from "models/uberservice";
import { SERVER_KEY } from "constant";

export interface IState {
    display?: boolean,
    currentPossition?: number[]

    coordinates?: any[];
    step: number;
    services?: Array<UberService>;
    bookingItems: Array<UberService>;
    loadingConfirm: boolean;
    bodySearch: {},
    coupon?: string,
}
export const InitState: IState = {
    display: true,
    coupon: '',
    step: 1,

    bookingItems: [
        {
            logo: 'https://benhvienthucuc.vn/wp-content/themes/benh-vien-thu-cuc-vn/assets/images/sec12_1.png',
            name: 'Thu Cúc Clinic',
            star: 3,
            rating: '5',
            childs: [
                {
                    key: 'CAT',
                    label: 'Cắt',
                    selected: true
                },
                {
                    key: 'DUONGTOC',
                    label: 'Dưỡng tóc',
                    selected: false
                },
                {
                    key: 'NHUOM',
                    label: 'Nhuộm',
                    selected: false
                }
            ]
        },
        {
            logo: 'https://benhvienthucuc.vn/wp-content/themes/benh-vien-thu-cuc-vn/assets/images/sec12_1.png',
            name: 'Thu Cúc Clinic',
            star: 4,
            rating: '5'
        },
        {
            logo: 'https://benhvienthucuc.vn/wp-content/themes/benh-vien-thu-cuc-vn/assets/images/sec12_1.png',
            name: 'Thu Cúc Clinic',
            star: 3,
            rating: '5',
            childs: [
                {
                    key: 'CAT',
                    label: 'Cắt',
                    selected: true
                },
                {
                    key: 'DUONGTOC',
                    label: 'Dưỡng tóc',
                    selected: false
                },
                {
                    key: 'NHUOM',
                    label: 'Nhuộm',
                    selected: false
                }
            ]
        },
    ],
    loadingConfirm: false,
    bodySearch: {
        server_key: SERVER_KEY,
        name: '',
        page: 1,
        pagesize: 10
    }
}