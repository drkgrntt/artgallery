import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import commentReducer from './commentReducer';
import artworkReducer from './artworkReducer';

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  artwork: artworkReducer,
  comment: commentReducer
});
