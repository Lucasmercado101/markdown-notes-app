import { ActionTypes, Action, TextEditAction } from "./types";

export const onTextEdit = (text: string): TextEditAction => {
  return { type: ActionTypes.ON_TEXT_EDIT, text };
};
export const changeColor: Action = { type: ActionTypes.CHANGE_COLOR };
export const cancelEdit: Action = { type: ActionTypes.CANCEL_EDIT };
export const savedNoteEdit: Action = { type: ActionTypes.SAVED_NOTE_EDIT };
export const toggleParsedText: Action = {
  type: ActionTypes.TOGGLE_PARSED_TEXT,
};
export const startEditingNote: Action = {
  type: ActionTypes.START_EDITING_NOTE,
};
