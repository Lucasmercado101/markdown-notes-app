import { Note } from "../components/Note/types";
import {
  Action,
  ActionTypes,
  AddNewNoteAction,
  DeleteNoteAction,
  FetchedNotesAction,
} from "./types";
type State = Note[];

function isAddNewNoteAction(action: Action): action is AddNewNoteAction {
  return action.type === ActionTypes.ADD_NOTE;
}

function isFetchedNotesAction(action: Action): action is FetchedNotesAction {
  return action.type === ActionTypes.FETCHED_NOTES;
}

function isDeleteNoteAction(action: Action): action is DeleteNoteAction {
  return action.type === ActionTypes.DELETE_NOTE;
}

export const reducer = (state: State, action: Action): State => {
  if (isAddNewNoteAction(action)) return [...state, action.newNote];
  if (isFetchedNotesAction(action)) return action.notes;
  if (isDeleteNoteAction(action))
    return state.filter((i) => i._id !== action._id);

  return state;
};
