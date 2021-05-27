import { createAction, createSlice } from "@reduxjs/toolkit";

const SLICE_NAME = "login";
const initialState = {
  error: null,
  loading: false,
  token: null,
  userName: null,
  isAdmin: false,
  employeeId: null,
  reviewer: null,
  success: false,
};

const loginSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    loginFailed: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    loginSuccess: (state, { payload }) => {
      state.loading = false;
      state.isAdmin = payload.isAdmin;
      state.userName = payload.name;
      state.employeeId = payload.id;
      state.success = payload.success;
      state.reviewer = payload.reviewer;
    },
  },
});

const loginAction = createAction(`${SLICE_NAME}/loginAction`);

export const { loginFailed, loginSuccess } = loginSlice.actions;
export { loginAction };

export default loginSlice.reducer;
