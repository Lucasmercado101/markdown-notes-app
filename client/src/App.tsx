import React, { useEffect, useReducer } from "react";
import "./assets/main.css";
import { FaPlus } from "react-icons/fa";
import Note from "./components/Note";
import HelpButton from "./components/HelpButton/HelpButton";
import { reducer } from "./useReducer/reducer";
import { Note as NoteType } from "./components/Note/types";
import {
  editedNote,
  deleteNote,
  addNewNote,
  fetchedNotes,
} from "./useReducer/actions";
import { createNewNote, getNotes, deleteNote as deleteNoteApi } from "./api";

function App() {
  const [notes, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    getNotes().then((i) => dispatch(fetchedNotes(i)));
  }, []);

  return (
    <div className="App p-4 w-full h-full bg-gray-200 text-gray-900">
      <div className="grid items-start auto-grow-1 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4 lg:gap-6 justify-center mb-6">
        {notes.map((data) => {
          return (
            <Note
              key={data._id}
              onEdited={(editedMessage: NoteType) =>
                dispatch(editedNote(editedMessage))
              }
              onRequestDelete={() =>
                deleteNoteApi(data._id).then(() =>
                  dispatch(deleteNote(data._id))
                )
              }
              content={data}
            />
          );
        })}
      </div>
      <button
        title="New note"
        onClick={() => {
          createNewNote().then((i) => dispatch(addNewNote(i)));
        }}
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
