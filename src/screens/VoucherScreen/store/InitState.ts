import { VoucherItem } from "models/voucher";
import { TagItem } from "models/tag";

export interface IState {
  items: Array<VoucherItem>,
  tabItems: Array<TagItem>,
  itemsUsed: Array<VoucherItem>,
  itemsNotUsed: Array<VoucherItem>,
}
export const InitState: IState = {
  tabItems: [
    {
      selected: true,
      label: 'Chưa dùng',
      key: 'NO'
    },
    {
      selected: false,
      label: 'Đã dùng',
      key: 'YES'
    },
  ],
  items: [],
  itemsUsed: [],
  itemsNotUsed: []
}