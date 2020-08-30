import { User } from 'models/user';
import { Theme } from "utils/Theme";

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
    showCamera?: boolean

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