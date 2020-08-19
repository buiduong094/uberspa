export interface VoucherItem {
    // logo?: string,
    // name?: string,
    // dueDate?: string,

    id?: number,
    discount_code_id?: number,
    expired_date?: string,
    type?: VourcherType, // 1 = đã sử dụng, 0 = chưa sử dụng
    description?: string,
    date_active?: string,
    type_view?: string,
    type_use?: string

}

export enum VourcherType {
    DASUDUNG = 1,
    CHUASUDUNG = 0
}