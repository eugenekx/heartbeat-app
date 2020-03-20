import { GET_REVIEW_SONG } from '../actions/types';

const initialState = {
    song: {}
};

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_REVIEW_SONG:
            return {
                ...state,
                song: action.payload,
            };
        default:
            return state;
    }
}