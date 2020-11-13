import { RouteComponentProps } from "react-router-dom";
export interface IWelcomWrap extends RouteComponentProps {
  history: H.History
  match: match<{ id: string; }>;
  upperChildren: JSX.Element[];
  lowerChildren: JSX.Element[];
  submitForm: (e) => void;
  location: H.Location<any>;
  staticContext?: StaticContext;
  isopen?: boolean;
}
interface IContextProps {
  state: ITheme;
  dispatch: ({ type: string, data: any }) => void;
}

export interface StateInterface {
  employee: { name: string, email: string } | undefined,
  form: {
    email: string,
    password: string,
    firstname: string,
    lastname: string
  },
  employeeForm: {
    email: string,
    name: string,
    role: "user" | "admin"
  },
  reviewForm: {
    score: number,
    employee: string,
    feedbackText: string
  },
  active_theme: any,
  toast: {
    open: boolean;
    loading?: boolean;
    message: string;
    type?: "success" | "danger";
    actions?: { title: string; callback: Function; map: Function };
  },
  popup: { open: boolean, message?: string, type?: string },
  modal: { open: boolean },
  sidebaropen: boolean,
  sidebartoggled: boolean
}
