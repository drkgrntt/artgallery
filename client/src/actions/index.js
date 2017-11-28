import axios from 'axios';
import { 
  FETCH_USER,
  CREATE_ARTWORK,
  FETCH_ARTWORK,
  FETCH_PIECE,
  DELETE_PIECE,
  CREATE_COMMENT,
  DELETE_COMMENT,
  UPDATE_ARTWORK,
  UPDATE_COMMENT,
  FETCH_COMMENT
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

export const fetchArtwork = () => async (dispatch) => {
  const res = await axios.get('/api/artwork');

  dispatch({ type: FETCH_ARTWORK, payload: res.data });
};

export const fetchPiece = (id) => async (dispatch) => {
  const res = await axios.get(`/api/artwork/${id}`);

  dispatch({ type: FETCH_PIECE, payload: res.data });
};

export const deletePiece = (id, history) => async (dispatch) => {
  const res = await axios.delete(`/api/artwork/${id}`);

  history.push('/artwork');
  dispatch({ type: DELETE_PIECE, payload: res.id });
};

export const createComment = (id, text, history) => async (dispatch) => {
  const res = await axios.post(`/api/artwork/${id}/comments`, text);

  history.push('/artwork');
  history.push(`/artwork/show/${id}`);
  dispatch({ type: CREATE_COMMENT, payload: res.data });
};

export const deleteComment = (pieceId, commentId, history) => async (dispatch) => {
  const res = await axios.delete(`/api/artwork/${pieceId}/comments/${commentId}`);

  history.push('/artwork');
  history.push(`/artwork/show/${pieceId}`);
  dispatch({ type: DELETE_COMMENT, payload: res.commentId });
};

export const updateArtwork = (id, values, history) => async (dispatch) => {
  const res = await axios.put(`/api/artwork/${id}`, values);
  
  history.push(`/artwork/show/${id}`);
  dispatch({ type: UPDATE_ARTWORK, payload: res.data });
};

export const updateComment = (id, comment_id, text, history) => async (dispatch) => {
  const res = await axios.put(`/api/artwork/${id}/comments/${comment_id}`, text);
  
  history.push('/artwork');
  history.push(`/artwork/show/${id}`);
  dispatch({ type: UPDATE_COMMENT, payload: res.data });
};

export const fetchComment = (id, comment_id) => async (dispatch) => {
  const res = await axios.get(`/api/artwork/${id}/comments/${comment_id}`);
  
  dispatch({ type: FETCH_COMMENT, payload: res.data });
};
