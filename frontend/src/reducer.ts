import { adminTheme, tommyCupTheme } from "./styledComponents/Theme";
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
const initialTheme = !!tempTheme ? JSON.parse(tempTheme) : tommyCupTheme;
export const initialState: StateInterface = {
  user: undefined,
  invoices: [],
  todos: [{
    content: "",
    isCompleted: false,
    date: new Date().toISOString(),
    prio: 0,
  }],
  popup: { open: false },
  modal: { open: false },
  sidebaropen: false,
  sidebartoggled: false,
  online_status: true,
  email_form: {
    to: "user@example.com",
    subject: "How are you?",
    body: "Lot of text and greetings and so on....",
  },
  form: {
    email: "admin@example.com",
    password: "password",
    firstname: "",
    lastname: "",
  },
  clientform: {
    id: undefined,
    name: "",
    address: "",
    company: "",
  },
  toast: {
    message: "",
    open: false,
    type: undefined,
  },
  active_theme: initialTheme || tommyCupTheme,
  productform: {
    title: undefined,
    paid: false,
    is_offer: false,
    is_taxfree: false,
    date: new Date().toISOString().substr(0, 10),
    number: Date.now(),
    notes: "",
    client: undefined,
    location: undefined,
    // client: {
    //   id: "",
    //   name: "",
    //   address: "",
    //   company: ""
    // },
    private_note: "",
    items: [{ date: new Date().toISOString().substr(0, 10), description: "", hours: 0, minutes: 0, price: 0, is_expense: false }],
  },
};
