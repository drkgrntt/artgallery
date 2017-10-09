import axios from 'axios';
import { 
  FETCH_USER,
  CREATE_ARTWORK
} from './types';

const ROOT_URL = 'http://localhost:9001/api';
const API_KEY = '?key=drkgrntt';

export const fetchUser = () => async (dispatch) => {
  const res = await axios.get('api/currentUser');

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const createArtwork = (values, callback) => {
  const request = axios.post(`${ROOT_URL}/artwork${API_KEY}`, values)
    .then(() => callback());

  return {
    type: CREATE_ARTWORK,
    payload: request
  };
}
