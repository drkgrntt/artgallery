import _ from 'lodash';
import { 
  FETCH_PIECE,
  DELETE_PIECE
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    // for deleting artwork
    case DELETE_PIECE:
      return _.omit(state, action.payload);
    // for show and update artwork pages, fetches one piece
    case FETCH_PIECE:
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
};
