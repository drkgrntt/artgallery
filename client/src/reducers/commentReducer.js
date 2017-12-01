import _ from 'lodash';
import {
  DELETE_COMMENT,
  FETCH_COMMENT
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    // for comment update form
    case FETCH_COMMENT:
      return { ...state, [action.payload.id]: action.payload };
    // for deleting commments
    case DELETE_COMMENT:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
