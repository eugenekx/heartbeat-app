import { 
    GET_REVIEW_SONG, 
    REVIEW_SONG_LOADING, 
    PLAYER_TOGGLE_PLAY, 
    PLAYER_TOGGLE_SEEK,
    CHANGE_DURATION, 
    CHANGE_CURRENTTIME 
} from '../actions/types';

const initialState = {
    song: {},
    isPlaying: false,
    duration: 0,
    currentTime: 0,
    isLoading: false,
    seek: false
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
        case PLAYER_TOGGLE_PLAY:
            return {
                ...state,
                isPlaying: !state.isPlaying,
            }
        case PLAYER_TOGGLE_SEEK:
            return {
                ...state,
                seek: !state.seek,
            }
        case CHANGE_DURATION:
            return {
                ...state,
                duration: action.payload,
            }
        case CHANGE_CURRENTTIME:
            return {
                ...state,
                currentTime: action.payload
            }
        default:
            return state;
    }
}