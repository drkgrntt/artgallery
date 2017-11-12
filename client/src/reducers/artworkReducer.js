import _ from 'lodash';
import { 
  FETCH_ARTWORK,
  FETCH_PIECE
} from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_ARTWORK:
      return action.payload;
    case FETCH_PIECE:
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
}
