import { adminTheme, feedbackTheme } from "./styledComponents/Theme";
import { StateInterface } from "./types";

export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.data };
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
    case "SET_FORM":
      return {
        ...state,
        [action.data.form_to_set]: {
          ...state[action.data.form_to_set],
          [action.data.field]: action.data.value
        },
      };
    default:
      throw new Error("Unexpected action");
  }
};
const tempTheme: any = localStorage.getItem("active_theme");
const initialTheme = !!tempTheme ? JSON.parse(tempTheme) : feedbackTheme;
export const initialState: StateInterface = {
  user: undefined,
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
  toast: {
    message: "",
    open: false,
    type: undefined,
  },
};
