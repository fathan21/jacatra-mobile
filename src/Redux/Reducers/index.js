import { combineReducers } from 'redux';
import Blog from './Blog-reducer';

const reducers = {
  BlogStore:Blog,
}

const rootReducer = combineReducers(reducers);

export default rootReducer;
