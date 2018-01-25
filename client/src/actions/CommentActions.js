import axios from 'axios';
import { 
  CREATE_COMMENT,
  DELETE_COMMENT,
  UPDATE_COMMENT,
  FETCH_COMMENT
} from './types';

// CREATE A COMMENT AND REDIRECT
export const createComment = (id, artwork_id, text, history) => async (dispatch) => {
  const res = await axios.post(`/api/folder/${id}/artwork/${artwork_id}/comments`, text);

  history.push('/gallery');
  history.push(`/gallery/${id}/artwork/show/${artwork_id}`);
  dispatch({ type: CREATE_COMMENT, payload: res.data });
};

// DELETE A COMMENT AND REDIRECT
export const deleteComment = (id, artwork_id, comment_id, history) => async (dispatch) => {
  const res = await axios.delete(`/api/folder/${id}/artwork/${artwork_id}/comments/${comment_id}`);

  history.push('/gallery');
  history.push(`/gallery/${id}/artwork/show/${artwork_id}`);
  dispatch({ type: DELETE_COMMENT, payload: res.id });
};

// UPDATE A COMMENT AND REDIRECT
export const updateComment = (id, artwork_id, comment_id, text, history) => async (dispatch) => {
  const res = await axios.put(`/api/folder/${id}/artwork/${artwork_id}/comments/${comment_id}`, text);
  
  history.push('/gallery');
  history.push(`gallery/${id}/artwork/show/${artwork_id}`);
  dispatch({ type: UPDATE_COMMENT, payload: res.data });
};

// FETCH DATA FOR ONE COMMENT FOR COMMENT UPDATE COMPONENT
export const fetchComment = (id, artwork_id, comment_id) => async (dispatch) => {
  const res = await axios.get(`/api/folder/${id}/artwork/${artwork_id}/comments/${comment_id}`);
  
  dispatch({ type: FETCH_COMMENT, payload: res.data });
};
