import _ from 'lodash';
import {
  DELETE_COMMENT,
  FETCH_COMMENT
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_COMMENT:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_COMMENT:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
