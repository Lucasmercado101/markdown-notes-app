import React, { useEffect, useLayoutEffect, useState } from "react";
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
    <div className="App overflow-auto w-full h-full bg-gray-200 text-gray-900">
      {userData.userID ? (
        <Notes userID={userData.userID} />
      ) : (
        <InitialForm onLoggedIn={() => setLoggedIn(true)} />
      )}
    </div>
  );
}

export default App;
