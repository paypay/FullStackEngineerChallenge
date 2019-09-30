import axios from 'axios';
import { GET_ERRORS, USERS_FETCH_COMPLETE, USERS_LOADING, USER_DELETING, USER_DELETING_COMPLETE } from "./types";

export const getUsers = () => dispatch => {
    dispatch({ type: USERS_LOADING })
    axios
        .get("/api/users/fetchAll")
        .then(res => dispatch({ type: USERS_FETCH_COMPLETE, payload: res.data }))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}

export const deleteUser = id => dispatch => {
    dispatch({ type: USER_DELETING });
    axios
        .delete("/api/users/delete", { data: { id } })
        .then(res => {
            dispatch({ type: USER_DELETING_COMPLETE });
            dispatch(getUsers());
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}
export const editUser = (userData, history) => dispatch => {
    axios
        .put("/api/users/edit", userData)
        .then(res => history.replace("/admin/employees"))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};
