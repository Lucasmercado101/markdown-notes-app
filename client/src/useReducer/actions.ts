import { Action, ActionTypes } from "./types";

export const logIn: Action = { type: ActionTypes.LOG_IN };
export const logOut: Action = { type: ActionTypes.LOG_OUT };
export const useAsGuest: Action = { type: ActionTypes.USE_AS_GUEST };
