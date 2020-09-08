import { adminTheme, feedbackTheme } from "./styledComponents/Theme";
import { StateInterface } from "./types";

export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_EMPLOYEE":
      return { ...state, employee: action.data };
    case "TOGGLE_TOAST":
      return {
        ...state,
        toast: {
          ...state.toast,
          ...action.data,
          loading:
            action.data.loading === undefined ? false : !!action.data.loading,
        },
      };
    case "TOGGLE_MENU":
      return { ...state, sidebaropen: action.data };
    case "TOGGLE_MODAL":
      return {
        ...state, modal: {
          ...state.modal, open: action.data.open ? action.data.open : !state.modal.open
        }
      };
    case "SET_FORM":
      return {
        ...state,
        [action.data.form_to_set]: {
          ...state[action.data.form_to_set],
          [action.data.field]: action.data.value
        },
      };
    case "UPDATE_FORM":
      return {
        ...state,
        [action.data.form_to_set]: action.data.form_value
      };
    default:
      throw new Error("Unexpected action");
  }
};
const tempTheme: any = localStorage.getItem("active_theme");
const initialTheme = !!tempTheme ? JSON.parse(tempTheme) : feedbackTheme;
export const initialState: StateInterface = {
  employee: undefined,
  popup: { open: false },
  modal: { open: false },
  sidebaropen: false,
  sidebartoggled: false,
  active_theme: initialTheme || feedbackTheme,
  form: {
    email: "admin@example.com",
    password: "password",
    firstname: "",
    lastname: "",
  },
  employeeForm: {
    email: `Tester${Date.now()}@example.com`,
    name: `Tester ${Date.now()}`,
    role: "user"
  },
  reviewForm: {
    score: 0.5,
    employee: ""
  },
  toast: {
    message: "",
    open: false,
    type: undefined,
  },
};
