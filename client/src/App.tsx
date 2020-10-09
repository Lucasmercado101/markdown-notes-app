import React, { useLayoutEffect, useReducer } from "react";
import Cookies from "js-cookie";
import "./assets/main.css";

import { logOut as logOutServer } from "./api";
import { reducer } from "./useReducer/reducer";
import { State } from "./useReducer/reducer";
import { logIn, logOut, useAsGuest } from "./useReducer/actions";
import InitialForm from "./views/InitialForm";
import Notes from "./views/Notes";
import Toasts from "./components/ToastsContainer/toasts";

const initialState: State = { isLoggedIn: false, userID: "" };
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isLoggedIn, userID } = state;

  useLayoutEffect(() => {
    if (Cookies.get("user")) {
      dispatch(logIn);
    }
  }, []);

  return (
    <div className="App w-full h-full bg-gray-200 overflow-auto text-gray-900">
      <div className={`relative w-full h-full overflow-hidden`}>
        {isLoggedIn ? (
          <Toasts.Provider>
            <Notes
              userID={userID}
              onRequestLogOut={() => {
                logOutServer().catch(() => {});
                dispatch(logOut);
              }}
            />
          </Toasts.Provider>
        ) : (
          <InitialForm
            onUseAsGuest={() => dispatch(useAsGuest)}
            onLoggedIn={() => dispatch(logIn)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
