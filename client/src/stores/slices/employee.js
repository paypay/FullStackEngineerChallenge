import { createAction, createSlice } from "@reduxjs/toolkit";

const SLICE_NAME = "employee";
const initialState = {
  error: null,
  employeeList: null,
  loading: false,
  employee: null,
  successMessage: "",
};

const employeeSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    fetchFailed: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    fetchSuccess: (state, { payload }) => {
      state.loading = false;
      state.employeeList = payload;
      state.employee = null;
    },
    setEmployee: (state, { payload }) => {
      state.loading = false;
      state.employee = payload;
    },
    setSuccessMessage: (state, { payload }) => {
      state.loading = false;
      state.successMessage = payload.message;
    },
  },
});

const getEmployees = createAction(`${SLICE_NAME}/getEmployees`);
const addEmployee = createAction(`${SLICE_NAME}/addEmployee`);
const updateEmployee = createAction(`${SLICE_NAME}/updateEmployee`);
const deleteEmployee = createAction(`${SLICE_NAME}/deleteEmployee`);

export const { fetchFailed, fetchSuccess, setEmployee, setSuccessMessage } =
  employeeSlice.actions;
export { getEmployees, addEmployee, updateEmployee, deleteEmployee };

export default employeeSlice.reducer;
