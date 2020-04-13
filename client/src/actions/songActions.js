import { 
    GET_REVIEW_SONG, 
    REVIEW_SONG_LOADING, 
    PLAYER_TOGGLE_PLAY,
    PLAYER_TOGGLE_SEEK,
    CHANGE_DURATION, 
    CHANGE_CURRENTTIME, 
} from './types';

import axios from 'axios';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getReviewSong = id => (dispatch, getState) => {
    // User loading
    dispatch({ type: REVIEW_SONG_LOADING });

    axios
        .get(`/api/songs/review/${id}`, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: GET_REVIEW_SONG,
                payload: res.data 
            }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const changeDuration = duration => {
    return {
        type: CHANGE_DURATION,
        payload: duration
    }
};

export const changeCurrentTime = currentTime => {    
    return {
        type: CHANGE_CURRENTTIME,
        payload: currentTime
    }
};

export const playerToggleSeek = () => {
    return {
        type: PLAYER_TOGGLE_SEEK
    }
}

export const playerTogglePlay = () => {
    return {
        type: PLAYER_TOGGLE_PLAY
    }
};