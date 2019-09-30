import axios from 'axios';
import {
    FEEDBACK_ERRORS,
    FEEDBACKS_LOADING,
    FETCH_FEEDBACKS_COMPLETE,
    FEEDBACK_SAVING,
    FEEDBACK_SAVE_COMPLETE,
    FEEDBACK_DELETING,
    FEEDBACK_DELETING_COMPLETE
} from "./types";

export const getFeedbacks = () => dispatch => {
    dispatch({ type: FEEDBACKS_LOADING })
    axios
        .get("/api/feedbacks/fetch")
        .then(res => dispatch({ type: FETCH_FEEDBACKS_COMPLETE, payload: res.data }))
        .catch(err =>
            dispatch({
                type: FEEDBACK_ERRORS,
                payload: err.response.data
            })
        );
}

export const saveFeedback = (feedback, history) => dispatch => {
    dispatch({ type: FEEDBACK_SAVING })
    axios
        .post("/api/feedbacks/save", feedback)
        .then(res => {
            dispatch({ type: FEEDBACK_SAVE_COMPLETE, payload: res.data })
            dispatch(getFeedbacks());
            history.replace("/admin/feedbacks")
        })
        .catch(err =>
            dispatch({
                type: FEEDBACK_ERRORS,
                payload: err.response.data
            })
        );
}

export const deleteFeedback = (id) => dispatch => {
    dispatch({ type: FEEDBACK_DELETING });
    axios
        .delete("/api/feedbacks/delete", { data: { id } })
        .then(res => {
            dispatch({ type: FEEDBACK_DELETING_COMPLETE });
            dispatch(getFeedbacks());
        })
        .catch(err =>
            dispatch({
                type: FEEDBACK_ERRORS,
                payload: err.response.data
            })
        );
};

export const editFeedback = (feedback, history) => dispatch => {
    dispatch({ type: FEEDBACK_SAVING })
    axios
        .put("/api/feedbacks/edit", feedback)
        .then(res => {
            dispatch({ type: FEEDBACK_SAVE_COMPLETE, payload: res.data })
            dispatch(getFeedbacks());
            history.replace("/admin/feedbacks")
        })
        .catch(err =>
            dispatch({
                type: FEEDBACK_ERRORS,
                payload: err.response.data
            })
        );
};