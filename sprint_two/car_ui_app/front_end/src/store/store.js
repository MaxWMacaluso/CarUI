import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import errorsReducer from '../reducers/errors';
import profileReducer from '../reducers/profile';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers({auth: authReducer, errors: errorsReducer, profile: profileReducer}),
  composeEnhancers(applyMiddleware(thunk))
);

export default store;

//Created a redux store with a single authentication reducer for now. We also added configuration for the redux dev tool to see realtime actions dispatched.