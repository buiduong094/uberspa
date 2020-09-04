import { User } from 'models/user';
import { Theme } from "utils/Theme";
import { ConversationItem } from 'models/conversation';

export interface ContextState {
    isConnection: boolean,
    version?: string,
    theme?: any,
    locale?: string,
    isLoggedIn?: boolean,
    displayIntro?: boolean,
    displaySplash?: boolean,
    user?: User,
    loading?: boolean,
    active?: boolean,
    searchName?: string // search shop by name
    fieldImage?: string,
    showCamera?: boolean,
    conversationItem?: ConversationItem, // cuộc hội thoại dc chọn
    activeCode?: any
}
export const InitState: ContextState =
{
    isConnection: true,
    theme: Theme.DARK,
    isLoggedIn: false,
    displaySplash: true,
    locale: 'VN',
    loading: false,
    active: false,
  
    showCamera: false
}