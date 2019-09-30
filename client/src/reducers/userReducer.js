import { USERS_FETCH_COMPLETE, USERS_LOADING, USER_DELETING } from "../actions/types";

const initialState = {
  users: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USERS_FETCH_COMPLETE:
      return {
        ...state,
        users: action.payload
      };
    case USERS_LOADING:
    case USER_DELETING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
