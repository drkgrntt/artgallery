import _ from 'lodash';
import { 
  FETCH_FOLDERS,
  FETCH_FOLDER,
  DELETE_FOLDER
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    // for index folders page
    case FETCH_FOLDERS:
      return action.payload;
    // for deleting a folder
    case DELETE_FOLDER:
      return _.omit(state, action.payload);
    // update folder page and index artwork, fetches one folder
    case FETCH_FOLDER:
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
};
