import _ from 'lodash';
import {
  DELETE_COMMENT
} from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case DELETE_COMMENT:
      return _.omit(state, action.payload);
    default:
      return state;
  }
}
