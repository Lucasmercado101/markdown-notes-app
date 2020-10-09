import React, { useEffect, useReducer } from "react";
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
import ToastsContainer from "../../components/ToastsContainer";
import Toasts from "../../components/ToastsContainer/toasts";
import newUUID from "react-uuid";
import { AxiosError } from "axios";

const Notes: React.FC<{ userID: string; onRequestLogOut: () => void }> = ({
  userID,
  onRequestLogOut,
}) => {
  const [notes, dispatch] = useReducer(reducer, []);
  const { newToast } = Toasts.useContainer();

  useEffect(() => {
    document.title = "Notes App";
    if (userID) {
      getNotes()
        .then((i) => dispatch(fetchedNotes(i.data)))
        .catch(() => {
          newToast("An unknown error has ocurred.");
          onRequestLogOut();
        });
    } else {
      dispatch(
        addNewNote({
          text: "! New note",
          color: "#fff",
          _id: newUUID(),
        })
      );
    }
  }, [newToast, onRequestLogOut, userID]);

  return (
    <div className="h-full w-full  overflow-auto">
      {notes.length > 0 && (
        <div className="grid mb-20 md:mb-24 items-start auto-grow-1 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4 lg:gap-6 justify-center p-6">
          <AnimatePresence>
            {notes.map((data) => (
              <Note
                key={data._id}
                onEdited={(note: NoteType) =>
                  userID &&
                  updateNote(note).catch((i: AxiosError) =>
                    newToast(
                      i.response?.statusText || "An unknown error has ocurred."
                    )
                  )
                }
                onRequestDelete={() => {
                  if (userID) {
                    deleteNoteApi(data._id)
                      .then(() => dispatch(deleteNote(data._id)))
                      .catch((i: AxiosError) =>
                        newToast(
                          i.response?.statusText ||
                            "An unknown error has ocurred."
                        )
                      );
                  } else {
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
            createNewNote()
              .then((newNoteData) => dispatch(addNewNote(newNoteData.data)))
              .catch((i: AxiosError) =>
                newToast(
                  i.response?.statusText || "An unknown error has ocurred."
                )
              );
          } else {
            dispatch(
              addNewNote({
                text: "! New note",
                color: "#fff",
                _id: newUUID(),
              })
            );
          }
        }}
        onRequestLogOut={onRequestLogOut}
      />
      <ToastsContainer />
    </div>
  );
};

export default Notes;
