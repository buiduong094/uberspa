
import { FieldName } from 'constant';

enum languages {
  en,
  vi
}



export const strings: any = {
  en: {
    auth:
    {
      [FieldName.EMAIL]: "Email",
      [FieldName.PASSWORD]: "Mật khẩu",
      [FieldName.RE_PASSWORD]: "Nhập lại mật khẩu",
      [FieldName.ADDRESS]: 'Địa chỉ',
      [FieldName.FULLNAME]: 'Họ tên',
      [FieldName.BIRTHDAY]: 'Ngày sinh',
      [FieldName.PASSPORT]: 'Chứng minh thư',
      [FieldName.GENDER]: 'Giới tính',
      [FieldName.ORGANIZATION]: 'Tên doanh nghiệp',
      [FieldName.TAX]: 'Mã số thuế',
      [FieldName.AGENT]: 'Người đại diện',
      [FieldName.PHONENUMBER]: 'Số điện thoại'


    },
    validation:
    {
      [FieldName.FULLNAME]: 'Họ tên không được để trống',
      [FieldName.EMAIL]: 'Email không được để trống',
      [FieldName.PASSPORT]: 'CMND/Hộ chiếu không được để trống',
      [FieldName.PASSWORD]: 'Mật khẩu không được để trống',
      [FieldName.RE_PASSWORD]: 'Mật khẩu không được để trống',
      [FieldName.PHONENUMBER]: 'Số điện thoại không được để trống',
    },
    placeholder:
    {
      [FieldName.EMAIL]: 'Nhập email',
      [FieldName.FULLNAME]: 'Tên hiện tại',
      [FieldName.PHONENUMBER]: 'Số điện thoại',
      [FieldName.ADDRESS]: 'Địa chỉ',
      [FieldName.BIRTHDAY]: 'Sinh nhật',
      [FieldName.GENDER]: 'Giới tính',
      [FieldName.PASSWORD]: 'Mật khẩu',
      [FieldName.RE_PASSWORD]: 'Nhập lại mật khẩu mới',

    },
    screen:
    {
      LOGIN_BUTTON_LABEL: 'Đăng nhập',
      REGISTER_BUTTON_LABEL: 'Đăng ký',
      REGISTER_TEXT_LABEL: 'Đăng ký tài khoản',
      REGISTER_INDIVIDUAL_LABEL: 'Cá nhân',
      REGISTER_ORGANIZATION_LABEL: 'Doanh nghiệp',
      ACTIVE_ACCOUNT: 'Kích hoạt ngày'

    },
    profile:
    {

    },
    action:
    {
      save: "",
      add: "",
      update: "",
      remove: ""
    },



  }
};
export const SegmentStrings = [
  'a',
  'b'
]
export const getString = (prefix: string, str: string) => {
  return strings['en'][prefix][str];
};
export const MessageDefine = {
  LOGIN_FAIL: 'Tài khoản hoặc mật khẩu không đúng',
  NETWORK_RIGHT: 'Đã kết nối internet',
  EXIT_APP: 'Bạn có muốn đăng xuất tài khoản?',
  UPDATE_USER: 'Cập nhật thông tin?',
  UPDATE_USER_SUCCESS: 'Cập nhật thông tin thành công',
  UPDATE_USER_FAIL: 'Cập nhật thông tin thất bại',
  THONGTIN_CANBO_LOI: 'Không lấy được thông tin cán bộ',
  CHANGE_PASS_SUCCESS: 'Cập nhật mật khẩu thành công',
  CHANGE_PASS_FAIL: 'Cập nhật mật khẩu không thành công',
  TRUNG_PASSWORD: 'Mật khẩu cũ không đúng',
  CHANGE_PASSWORD: 'Cập nhật mật khẩu?',
  CREATE_BOOKING: 'Xác nhận đặt chỗ?',
  REQUIRE_OPEN_GPS: 'Bật dịch vụ định vị để cho phép Hệ thống xác định vị trí của bạn',
  DELETE_BOOKING: 'Bạn có muốn huỷ bỏ lịch đặt này không?'
}
