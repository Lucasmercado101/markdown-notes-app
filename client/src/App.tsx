import React, { useLayoutEffect, useState } from "react";
import Cookies from "js-cookie";
import "./assets/main.css";

import InitialForm from "./views/InitialForm";
import Notes from "./views/Notes";

function App() {
  //Todo Set this state as a usereducer
  const [userData, setUserData] = useState({ userID: "" });
  const [loggedIn, setLoggedIn] = useState(false);

  useLayoutEffect(() => {
    const cookieData = Cookies.get("user");
    if (cookieData) {
      setUserData({ userID: cookieData });
    }
  }, [loggedIn]);

  return (
    <div className="App w-full h-full bg-gray-200 overflow-auto text-gray-900">
      <div className={`relative w-full h-full overflow-hidden`}>
        {userData.userID ? (
          <Notes userID={userData.userID} />
        ) : (
          <InitialForm onLoggedIn={() => setLoggedIn(true)} />
        )}
      </div>
    </div>
  );
}

export default App;
