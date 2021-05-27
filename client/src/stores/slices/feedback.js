import { createAction, createSlice } from "@reduxjs/toolkit";

const SLICE_NAME = "feedback";
const initialState = {
  error: null,
  message: "",
  loading: false,
  feedback: null,
  feedBackList: null,
};

const feedbackSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    fetchFailed: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    fetchSuccess: (state, { payload }) => {
      state.loading = false;
      state.feedBackList = payload;
      state.feedback = null;
    },
    saveFeedback: (state, { payload }) => {
      state.loading = false;
      state.feedback = payload;
    },
  },
});

const getFeedBacks = createAction(`${SLICE_NAME}/fetchFeedbacks`);
const addFeedback = createAction(`${SLICE_NAME}/addFeedback`);

export const { fetchFailed, fetchSuccess, saveFeedback } =
  feedbackSlice.actions;
export { getFeedBacks, addFeedback };

export default feedbackSlice.reducer;
