import { ContextState } from "./context/InitState";
import { IState as CertState } from "./cert/InitState";



export interface ApplicationState {
    ContextState: ContextState,
    CertState: CertState

  }
export interface IAction {
    type: string;
}
export interface ThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}

