import { createStore, compose, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import userReducer from './userReducer';

// const rootReducer = combineReducers({
//   user: userReducer
// });

const configureStore = () => {
  return createStore(
    userReducer,
    composeWithDevTools(compose(applyMiddleware(thunk)))
  );
};

export default configureStore;