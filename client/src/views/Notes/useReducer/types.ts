import { Note } from "../../../components/Note/types";

export enum ActionTypes {
  DELETE_NOTE,
  ADD_NOTE,
  EDITED_NOTE,
  FETCHED_NOTES,
}

export type Action = {
  type: number;
};

export type DeleteNoteAction = {
  _id: string;
} & Action;

export type AddNewNoteAction = {
  newNote: Note;
} & Action;

export type FetchedNotesAction = {
  notes: Note[];
} & Action;
