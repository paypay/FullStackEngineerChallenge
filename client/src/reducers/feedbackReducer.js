import {
    FEEDBACKS_LOADING,
    FEEDBACK_ERRORS,
    FETCH_FEEDBACKS_COMPLETE,
    FEEDBACK_DELETING
} from "../actions/types";

const initialState = {
    feedbacks: [],
    loading: false,
    error: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_FEEDBACKS_COMPLETE:
            return {
                ...state,
                feedbacks: action.payload
            };
        case FEEDBACKS_LOADING:
        case FEEDBACK_DELETING:
            return {
                ...state,
                loading: true
            };
        case FEEDBACK_ERRORS:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}
