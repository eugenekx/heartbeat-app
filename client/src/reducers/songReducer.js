import { GET_SONG, ADD_SONG, DELETE_SONG, SONG_LOADING } from '../actions/types';

const initialState = {
    song: null,
    loading: false
};

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_SONG:
            return {
                ...state,
                song: action.payload,
                loading: false
            };
        case DELETE_SONG:
            return {
                ...state,
                song: state.song.filter(song => song._id !== action.payload)
            }
        case ADD_SONG:
            return {
                ...state,
                song: [action.payload, ...state.song]
            };
        case SONG_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
        
    }
}