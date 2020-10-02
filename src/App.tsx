import React, { useReducer } from "react";
import Note from "./components/Note";
import { note } from "./components/types";
import { FaPlus } from "react-icons/fa";
import "./assets/main.css";
import HelpButton from "./components/HelpButton";

type action = {
  type: number;
  noteID?: number;
  editedMessage?: note;
};

enum actionTypes {
  DELETE_NOTE,
  ADD_NOTE,
  EDITED_NOTE,
}

type State = note[];

const reducer = (state: State, action: action): State => {
  switch (action.type) {
    case actionTypes.DELETE_NOTE:
      return state.filter((i) => i.id !== action.noteID);
    case actionTypes.ADD_NOTE:
      return [
        ...state,
        // pseudo unique id
        { text: "! New note", id: Math.ceil(Math.random() * 150) },
      ];

    case actionTypes.EDITED_NOTE:
      // console.log(action.editedMessage);
      const editedID = action.editedMessage!.id;

      return state.map((i) => {
        if (i.id === editedID) {
          return action.editedMessage!;
        } else {
          return i;
        }
      });

    default:
      return state;
  }
};

function App() {
  const [notes, dispatch] = useReducer(reducer, [
    {
      text:
        "! Title\nThis __is  underline__, and this is ~~crossed out~~, this is\n ''bold''\n[[ddgLink|https://duckduckgo.com/]]",
      id: 1,
    },
  ]);
  return (
    <div className="App p-4 w-full text-gray-900">
      <div className="grid items-start auto-grow-1 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4 lg:gap-6 justify-center mb-6">
        {notes.map((data) => {
          return (
            <Note
              key={data.id}
              onEdited={(editedMessage: note) =>
                dispatch({ type: actionTypes.EDITED_NOTE, editedMessage })
              }
              onRequestDelete={() =>
                dispatch({ type: actionTypes.DELETE_NOTE, noteID: data.id })
              }
              content={data}
            />
          );
        })}
      </div>
      <button
        onClick={() => dispatch({ type: actionTypes.ADD_NOTE })}
        style={{ right: "20px", bottom: "20px" }}
        className="shadow-md fixed rounded-full bg-teal-300 h-16 w-16 md:h-20 md:w-20 grid place-items-center"
      >
        <FaPlus className="w-3/5  h-auto text-gray-900 outline-none" />
      </button>
      <HelpButton />
    </div>
  );
}

export default App;
