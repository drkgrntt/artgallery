import axios from 'axios';
import {
  CREATE_FOLDER,
  FETCH_FOLDERS,
  FETCH_FOLDER,
  DELETE_FOLDER,
  UPDATE_FOLDER
} from './types';

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
