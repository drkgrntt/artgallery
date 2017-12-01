import _ from 'lodash';
import { 
  FETCH_ARTWORK,
  FETCH_PIECE,
  DELETE_PIECE
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    // for index artwork page
    case FETCH_ARTWORK:
      return action.payload;
    // for deleting artwork
    case DELETE_PIECE:
      return _.omit(state, action.payload);
    // for show and update artwork pages
    case FETCH_PIECE:
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
};
