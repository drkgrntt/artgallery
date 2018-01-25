import axios from 'axios';
import {
  FETCH_USER
} from './types';

// FETCH CURRENT USER FOR LIFE CYCLE
export const fetchUser = () => async (dispatch) => {
  const res = await axios.get('/api/currentUser');

  dispatch({ type: FETCH_USER, payload: res.data });
};

// MAKE THE CURRENT USER AN ADMIN AND REDIRECT
export const makeAdmin = (value, history) => async (dispatch) => {
  const res = await axios.post('/api/admin', value);

  history.push('/gallery');
  dispatch({ type: FETCH_USER, payload: res.data });
};
