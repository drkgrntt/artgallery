import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import commentReducer from './commentReducer';
import artworkReducer from './artworkReducer';
import folderReducer from './folderReducer';

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  folder: folderReducer,
  artwork: artworkReducer,
  comment: commentReducer
});
