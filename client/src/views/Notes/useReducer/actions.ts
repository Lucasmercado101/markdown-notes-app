import { Note } from "../../../components/Note/types";
import {
  ActionTypes,
  AddNewNoteAction,
  DeleteNoteAction,
  FetchedNotesAction,
} from "./types";

export const deleteNote = (noteID: string): DeleteNoteAction => {
  return { type: ActionTypes.DELETE_NOTE, _id: noteID };
};

export const addNewNote = (newNote: Note): AddNewNoteAction => {
  return { type: ActionTypes.ADD_NOTE, newNote };
};

export const fetchedNotes = (notes: Note[]): FetchedNotesAction => {
  return { type: ActionTypes.FETCHED_NOTES, notes };
};
