import React, { useEffect, useReducer, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Note from "../../components/Note";
import Menu from "./Menu";
import { Note as NoteType } from "../../components/Note/types";
import { reducer } from "./useReducer/reducer";
import { deleteNote, addNewNote, fetchedNotes } from "./useReducer/actions";
import {
  createNewNote,
  getNotes,
  deleteNote as deleteNoteApi,
  updateNote,
} from "../../api";

//TODO: Set a note limit of 100

let localIDs: number[] = [1];

const Notes: React.FC<{ userID: string; onRequestLogOut: () => void }> = ({
  userID,
  onRequestLogOut,
}) => {
  const [notes, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    if (userID) {
      getNotes().then((i) => dispatch(fetchedNotes(i)));
    } else {
      const newID = localIDs[localIDs.length - 1] + 1;
      localIDs.push(newID);

      dispatch(
        addNewNote({
          text: "! New note",
          color: "#fff",
          _id: newID.toString(),
        })
      );
    }
  }, []);

  return (
    <div className="h-full w-full  overflow-auto">
      {notes.length > 0 && (
        <div className="grid mb-20 md:mb-24 items-start auto-grow-1 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4 lg:gap-6 justify-center p-6">
          <AnimatePresence>
            {notes.map((data) => (
              <Note
                key={data._id}
                onEdited={(note: NoteType) => userID && updateNote(note)}
                onRequestDelete={() => {
                  if (userID) {
                    deleteNoteApi(data._id)
                      .then(() => dispatch(deleteNote(data._id)))
                      .catch(() => console.log("Error deleting"));
                  } else {
                    localIDs = localIDs.filter((i) => i !== +data._id);
                    dispatch(deleteNote(data._id));
                  }
                }}
                content={data}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      <Menu
        onRequestAddNewNote={async () => {
          if (userID) {
            createNewNote().then((newNoteData) =>
              dispatch(addNewNote(newNoteData))
            );
          } else {
            const newID = localIDs[localIDs.length - 1] + 1;
            localIDs.push(newID);

            dispatch(
              addNewNote({
                text: "! New note",
                color: "#fff",
                _id: newID.toString(),
              })
            );
          }
        }}
        onRequestLogOut={onRequestLogOut}
      />
    </div>
  );
};

export default Notes;
