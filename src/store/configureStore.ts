import { InitState as ContextState } from './context/InitState';
import { Reducer as ContextReducer } from './context/Reducer';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { Reducer as ServiceReducer, InitState as ServiceState } from 'store/service';

import { ApplicationState } from './configureAction';


const AllReducers = {
  ContextState: ContextReducer,
  ServiceState: ServiceReducer
}
const AppState: ApplicationState = {
  ContextState: ContextState,
  ServiceState: ServiceState
};
const rootReducers = combineReducers({ ...AllReducers })
const middlewares = applyMiddleware(thunk);
const store = createStore(rootReducers, AppState, middlewares);


export default store;
