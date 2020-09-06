import { ConversationItem } from "models/conversation";
import { Message } from "models/message";
import { CameraItem } from "components/Camera/PhotoSelect";

export interface IState {
  conversations: Array<ConversationItem>,
  conversationItem?: ConversationItem,
  messageItems: Array<Message>,
  message?: string,
  isSent?: boolean,
  showModal?: boolean,
  loading: boolean,
  showCamera: boolean,
  showVideo: boolean,
  pageSize: number, // pageSize
  timeFrom: number,
  onEndReachedCalledDuringMomentum: boolean,
  canLoadMore: boolean, //có fetch được tiếp dữ liệu ko?
  images?: CameraItem[],
  videos?: CameraItem[]
}
export const InitState: IState = {
  conversations: [],
  messageItems: [],
  isSent: false,
  showModal: false,
  loading: false,
  showCamera: false,
  showVideo: false,
  pageSize: 10,
  timeFrom: 0,
  onEndReachedCalledDuringMomentum: true,
  canLoadMore: true
}