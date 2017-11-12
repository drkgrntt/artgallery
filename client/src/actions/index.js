import axios from 'axios';
import { 
  FETCH_USER,
  CREATE_ARTWORK,
  FETCH_ARTWORK,
  FETCH_PIECE
} from './types';

export const fetchUser = () => async (dispatch) => {
  const res = await axios.get('/api/currentUser');

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const makeAdmin = (value, history) => async (dispatch) => {
  const res = await axios.post('/api/admin', value);

  history.push('/artwork');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const createArtwork = (values, history) => async (dispatch) => {
  let formData = new FormData();
  for (const key in values) {
    if (key === 'image') {
      formData.append(key, values[key][0]);
    } else {
      formData.append(key, values[key]);
    }
  }

  const res = await axios.post('/api/artwork', formData);

  history.push('/artwork');
  dispatch({ type: CREATE_ARTWORK, payload: res.data });
};

export const fetchArtwork = (values) => async (dispatch) => {
  const res = await axios.get('/api/artwork', values);

  dispatch({ type: FETCH_ARTWORK, payload: res.data });
};

export const fetchPiece = (id, values) => async (dispatch) => {
  const res = await axios.get(`/api/artwork/${id}`, values);

  dispatch({ type: FETCH_PIECE, payload: res.data });
};
