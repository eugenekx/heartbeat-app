import { GET_SONG, ADD_SONG, DELETE_SONG, SONG_LOADING } from './types';
import axios from 'axios';


export const getSong = id => dispatch => {
    dispatch(setSongLoading());
    axios
        .get(`/api/songs/${id}`)
        .then(res =>
            dispatch({
                type: GET_SONG,
                payload: res.data 
            })
    )
};

export const addSong = song => dispatch => {
    axios
        .post('/api/songs', song)
        .then(res => 
            dispatch({
                type: ADD_SONG,
                payload: res.data
            })
        )
}

export const deleteSong = id => dispatch => {
    axios
        .delete(`api/songs/${id}`)
        .then(res =>
            dispatch({
                type: DELETE_SONG,
                payload: id
            })
        )    
};

export const setSongLoading = () => {
    return {
        type: SONG_LOADING
    };
}