import { GET_REVIEW_SONG, REVIEW_SONG_LOADING } from '../actions/types';

const initialState = {
    song: {},
    isLoading: false
};

export default function(state = initialState, action) {
    switch(action.type) {
        case REVIEW_SONG_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case GET_REVIEW_SONG:
            return {
                ...state,
                song: action.payload,
                isLoading: false
            };
        default:
            return state;
    }
}