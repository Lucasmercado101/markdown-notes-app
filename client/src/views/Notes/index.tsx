import React, { useEffect, useReducer, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Note from "../../components/Note";
import HelpButton from "../../components/HelpButton/HelpButton";
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

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
  exit: {
    x: -100,
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

const Notes: React.FC<{ userID: string }> = ({ userID }) => {
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

  useEffect(() => {
    console.log(notes.length);
  }, [notes]);

  return (
    <div className="h-full w-full overflow-auto">
      {notes.length > 0 && (
        <div className="grid items-start auto-grow-1 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4 lg:gap-6 justify-center mb-6 p-6">
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
      <motion.div
        whileHover={{ rotate: 90, scale: 1.1 }}
        title="New note"
        onClick={async () => {
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
        style={{ right: "20px", bottom: "20px" }}
        className="shadow-md fixed cursor-pointer rounded-full bg-teal-300 h-16 w-16 md:h-20 md:w-20 grid place-items-center"
      >
        <FaPlus className="w-3/5  h-auto text-gray-900 outline-none" />
      </motion.div>
      <HelpButton />
    </div>
  );
};

export default Notes;
