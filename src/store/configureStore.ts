import { InitState as ContextState } from './context/InitState';
import { Reducer as ContextReducer } from './context/Reducer';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { Reducer as CertReducer, InitState as CertState } from './cert';

import { ApplicationState } from './configureAction';


const AllReducers = {
  ContextState: ContextReducer,
  CertState: CertReducer
}
const AppState: ApplicationState = {
  ContextState: ContextState,
  CertState: CertState
};
const rootReducers = combineReducers({ ...AllReducers })
const middlewares = applyMiddleware(thunk);
const store = createStore(rootReducers, AppState, middlewares);


export default store;
