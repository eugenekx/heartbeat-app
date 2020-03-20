import { GET_REVIEW_SONG } from './types';
import axios from 'axios';


export const getReviewSong = id => dispatch => {
    axios
        .get(`/api/songs/${id}`)
        .then(res =>
            dispatch({
                type: GET_REVIEW_SONG,
                payload: res.data 
            })
    )
};
