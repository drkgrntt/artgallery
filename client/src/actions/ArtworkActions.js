import axios from 'axios';
import {
  CREATE_ARTWORK,
  FETCH_PIECE,
  DELETE_PIECE,
  UPDATE_ARTWORK
} from './types';

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

// UPDATE A PIECE OF ARTWORK AND REDIRECT
export const updateArtwork = (id, artwork_id, values, history) => async (dispatch) => {
  const res = await axios.put(`/api/folder/${id}/artwork/${artwork_id}`, values);
  
  history.push(`/gallery/${id}/artwork/show/${artwork_id}`);
  dispatch({ type: UPDATE_ARTWORK, payload: res.data });
};
