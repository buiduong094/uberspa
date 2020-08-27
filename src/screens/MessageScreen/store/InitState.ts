import { ConversationItem } from "models/conversation";
import { Message } from "models/message";

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
}
export const InitState: IState = {
  conversations: [],
  messageItems: [],
  isSent: false,
  showModal: false,
  loading: false,
  showCamera: false,
  showVideo: false
}