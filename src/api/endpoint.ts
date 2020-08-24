
const BASE_API_URL = 'https://bao.webthuonggia.com/api';
export const Endpoint = {
    BASE_URL: 'https://bao.webthuonggia.com',
    LOGIN: `${BASE_API_URL}/login`,
    CREATE_CUSTOMER: `${BASE_API_URL}/create_customer`,
    CHANGE_PASSWORD: `${BASE_API_URL}/change_password?=`,

    
    CREATE_SHOP: `${BASE_API_URL}/create_shop`,
    LOGOUT: `${BASE_API_URL}/logout`,
    GET_PRODUCT: `${BASE_API_URL}/getallproduct`,
    SEARCH_SHOP: `${BASE_API_URL}/searh_shop`,
    SHOP_SERVICE: `${BASE_API_URL}/shop_services_detail`,
    COUPON_VALID:`${BASE_API_URL}/check_ma_giam_gia`,
    SEARCH_SERVICE: `${BASE_API_URL}/searh_services`,
    SEARCH_NEAR_BY: `${BASE_API_URL}/searh_shop_near`,
    GET_SLIDER: `${BASE_API_URL}/get_image_home`,
    BOOKING_LIST:`${BASE_API_URL}/booking_customer_get_list`,

    USER_DETAIL: `${BASE_API_URL}/customer_detail`,
    USER_UPDATE: `${BASE_API_URL}/customer_update_profile`,
    UPDATE_GET_NOTIFI: `${BASE_API_URL}/customer_update_notification`,
    GET_NOTIFICATION: `${BASE_API_URL}/customer_get_notification`,
    GET_COUPON_LIST: `${BASE_API_URL}/customer_get_discount`,
    GET_LIST_MESSAGE: `${BASE_API_URL}/get_list_user_message`,
    GET_MESSAGE: `${BASE_API_URL}/get_message`,
    SEND_MESSAGE: `${BASE_API_URL}/send_message`

}