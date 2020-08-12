import { START_LOADING, END_LOADING } from '../actionConstants';

export const initialState = {
  isLoading: false,
};

export default (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case START_LOADING: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case END_LOADING: {
      return {
        ...state,
        isLoading: false,
      };
    }
    default: {
      return state;
    }
  }
};
