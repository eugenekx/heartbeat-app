import { GET_REVIEW_SONG, REVIEW_SONG_LOADING } from './types';
import axios from 'axios';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getReviewSong = id => (dispatch, getState) => {
    // User loading
    dispatch({ type: REVIEW_SONG_LOADING });

    axios
        .get(`/api/songs/${id}`, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: GET_REVIEW_SONG,
                payload: res.data 
            }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};
