import { createAction, createSlice } from "@reduxjs/toolkit";

const SLICE_NAME = "logout";
const initialState = {
  error: null,
  message: "",
  loading: false,
};

const logOutSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    logOutFailed: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    logOutSuccess: (state, { payload }) => {
      state.loading = false;
      state.message = payload;
    },
  },
});

const logOut = createAction(`${SLICE_NAME}/logOut`);

export const { logOutFailed, logOutSuccess } = logOutSlice.actions;
export { logOut };

export default logOutSlice.reducer;
