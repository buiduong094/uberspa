import { ContextState } from "./context/InitState";
import { State as ServiceState } from "store/service/InitState";



export interface ApplicationState {
    ContextState: ContextState,
    ServiceState: ServiceState

  }
export interface IAction {
    type: string;
}
export interface ThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}

