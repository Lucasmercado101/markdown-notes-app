import { ActionTypes, Action } from "./types";
import Cookies from "js-cookie";

export type State = {
  isLoggedIn: boolean;
  userID: string;
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionTypes.LOG_IN:
      return { isLoggedIn: true, userID: Cookies.get("user")! };
    case ActionTypes.LOG_OUT:
      Cookies.remove("user");
      return { isLoggedIn: false, userID: "" };
    case ActionTypes.USE_AS_GUEST:
      return { isLoggedIn: true, userID: "" };

    default:
      return state;
  }
};
