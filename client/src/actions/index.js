import axios from 'axios';
import { 
  FETCH_USER,
  CREATE_ARTWORK,
  FETCH_PIECE,
  DELETE_PIECE,
  CREATE_COMMENT,
  DELETE_COMMENT,
  UPDATE_ARTWORK,
  UPDATE_COMMENT,
  FETCH_COMMENT,
  CREATE_FOLDER,
  FETCH_FOLDERS,
  FETCH_FOLDER,
  DELETE_FOLDER,
  UPDATE_FOLDER
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

// CREATE A NEW FOLDER
export const createFolder = (values, history) => async (dispatch) => {
  let formData = new FormData();
  // combining input field and text fields into one object
  for (const key in values) {
    if (key === 'image') {
      formData.append(key, values[key][0]);
    } else {
      formData.append(key, values[key]);
    }
  }
  const res = await axios.post('/api/folder', formData);

  history.push('/gallery');
  dispatch({ type: CREATE_FOLDER, payload: res.data });
};

// FETCH ALL FOLDERS
export const fetchFolders = () => async (dispatch) => {
  const res = await axios.get('/api/folder/');

  dispatch({ type: FETCH_FOLDERS, payload: res.data });
};

// FETCH ONE PARTICULAR FOLDER
export const fetchFolder = (id) => async (dispatch) => {
  const res = await axios.get(`/api/folder/${id}`);

  dispatch({ type: FETCH_FOLDER, payload: res.data });
};

// DELETE A PARTICULAR FOLDER
export const deleteFolder = (id, history) => async (dispatch) => {
  const res = await axios.delete(`/api/folder/${id}`);

  history.push(`/gallery`);
  dispatch({ type: DELETE_FOLDER, payload: res.id });
};

// UPDATE A PARTICULAR FOLDER
export const updateFolder = (id, values, history) => async (dispatch) => {
  const res = await axios.put(`/api/folder/${id}`, values);
  
  history.push(`/gallery/${id}/artwork`);
  dispatch({ type: UPDATE_FOLDER, payload: res.data });
};

// CREATE A PIECE OF ARTWORK AND REDIRECT
export const createArtwork = (values, id, history) => async (dispatch) => {
  let formData = new FormData();
  // combining input field and text fields into one object
  for (const key in values) {
    if (key === 'image') {
      formData.append(key, values[key][0]);
    } else {
      formData.append(key, values[key]);
    }
  }
  const res = await axios.post(`/api/folder/${id}/artwork`, formData);

  history.push(`/gallery/${id}/artwork`);
  dispatch({ type: CREATE_ARTWORK, payload: res.data });
};

// FETCH DATA ON ONE ARTWORK PIECE FOR SHOW AND UPDATE COMPONENTS
export const fetchPiece = (id, artwork_id) => async (dispatch) => {
  const res = await axios.get(`/api/folder/${id}/artwork/${artwork_id}`);

  dispatch({ type: FETCH_PIECE, payload: res.data });
};

// DELETE SELECTED ARTWORK PIECE AND REDIRECT
export const deletePiece = (id, artwork_id, history) => async (dispatch) => {
  const res = await axios.delete(`/api/folder/${id}/artwork/${artwork_id}`);

  history.push(`/gallery/${id}/artwork`);
  dispatch({ type: DELETE_PIECE, payload: res.id });
};

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

// UPDATE A PIECE OF ARTWORK AND REDIRECT
export const updateArtwork = (id, artwork_id, values, history) => async (dispatch) => {
  const res = await axios.put(`/api/folder/${id}/artwork/${artwork_id}`, values);
  
  history.push(`/gallery/${id}/artwork/show/${artwork_id}`);
  dispatch({ type: UPDATE_ARTWORK, payload: res.data });
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
