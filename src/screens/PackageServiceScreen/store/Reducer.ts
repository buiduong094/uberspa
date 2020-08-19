import { ActionType as ContextAction } from 'store/context/ActionType';



import { ActionType } from './ActionType';

import { client, setToken } from 'api/client';
import { IState } from './InitState';


import { User } from 'models/user';
interface RequestAction {
    type: string,
}
interface ReceivedAction {
    type: string,
    data: any
}
interface CommitAction {
    type: string,
    user?: User
}
interface CommitedAction {
    type: string,

    isLoggedIn: boolean
}
type KnownAction = RequestAction | ReceivedAction | CommitAction | CommitedAction;


export const ActionCreators = {

  


}
export const reducer = (state: IState, incomingAction: KnownAction): IState => {
    let action
    switch (incomingAction.type) {
       
        default:
            return state
    }
}

