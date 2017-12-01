import { FETCH_USER } from '../actions/types';

export default (state = null, action) => {
  switch (action.type) {
    // from req.user
    case FETCH_USER:
      return action.payload || false;
    default:
      return state;
  }
};
