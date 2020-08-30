
export const nameRegExp = /^[a-zA-Z0-9]+$/;
export const emailRegExp = /\S+@\S+\.\S+/;
export const passRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export const EndpointApiKey = '03c1bcd9-7a02-481c-8e2f-ce833a78b6f7';


export const RouteName = {

	APP: 'APP',
	SERVICE: 'SERVICE',
	LOGIN: "LOGIN",
	REGISTER: 'REGISTER',
	NOTIFICATION: 'NOTIFICATION',
	SIGNLIST: 'SIGNLIST',
	SIGN: 'SIGN',
	SETTING: 'SETTING',
	USER: 'USER',
	ACTIVE_ACCOUNT: 'ACTIVE_ACCOUNT',
	MESSAGE: 'MESSAGE',
	CONVERSATION: 'CONVERSATION',
	CALENDAR: 'CALENDAR',
	VOUCHER: 'VOUCHER',
	BOOKING: 'BOOKING',
	PACKAGESERVICE: 'PACKAGESERVICE',
	MAP:'MAP',
	FORGOT_PASSWORD: 'FORGOT_PASSWORD',
	PREMESIE: 'PREMESIE'

}
export const FieldName = {

	EMAIL: "EMAIL",
	PASSWORD: "PASSWORD",
	RE_PASSWORD: "RE_PASSWORD",
	ADDRESS: 'ADDRESS',
	PHONENUMBER: 'PHONENUMBER',
	REGISTER: 'REGISTER',
	FULLNAME: 'FULLNAME',
	BIRTHDAY: 'BIRTHDAY',
	PASSPORT: 'PASSPORT',
	GENDER: 'GENDER',
	ORGANIZATION: 'ORGANIZATION',
	TAX: 'TAX',
	AGENT: 'AGENT'
}
export const AppPlaceHolder = {
	PLACE_HOLDER_EMAIL: 'PLACE_HOLDER_EMAIL',
	PLACE_HOLDER_PASSWORD: 'PLACE_HOLDER_PASSWORD',
	PLACE_HOLDER_RE_PASSWORD: 'PLACE_HOLDER_RE_PASSWORD',
}

export enum UberItemType {
	SERVICE = 'SERVICE', // danh sách dịch vụ ngoài dashboard
	PACKAGESERVICE = 'PACKAGESERVICE', // ds gói dịch vụ
	BOOKING = 'BOOKING', // lịch đặt
	BRANCH = 'BRANCH', // ds cơ sở
	BOOKINGSERVICE = 'BOOKINGSERVICE', // các dịch vụ trong đặt chỗ
	CHAT = 'CHAT', // cuộc hội thoại
	NOTIFICATION = 'NOTIFICATION', // thông báo
	VOUCHER = 'VOUCHER' // phiếu giảm giá
}

export enum ImageButtonType {
	VIEW = 'VIEW',
	TOUCHOPACITY = 'TOUCHOPACITY'
}

export const SERVER_KEY = 'eh4xucBIJmoblq1MoIkTFVKO4gsmqF_mW9d1jK741';