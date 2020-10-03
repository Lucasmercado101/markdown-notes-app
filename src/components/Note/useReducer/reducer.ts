import { ActionTypes, Action, TextEditAction } from "./types";

export type State = {
  rows: number;
  isParsedTextVisible: boolean;
  isEditing: boolean;
  preEditText: string;
  preEditColor: string;
  noteText: string;
  color: string;
};

const colors = [
  "#fed7d7",
  "#edf2f7",
  "#feebc8",
  "#c3dafe",
  "#fff",
  "#b2f5ea",
  "#fed7e2",
];

function isTextEditAction(action: Action): action is TextEditAction {
  return action.type === ActionTypes.ON_TEXT_EDIT;
}

export const reducer = (state: State, action: Action): State => {
  if (isTextEditAction(action)) {
    return {
      ...state,
      rows: action.text!.split(/\r\n|\r|\n/g).length + 1,
      noteText: action.text!,
    };
  }
  switch (action.type) {
    case ActionTypes.TOGGLE_PARSED_TEXT:
      return { ...state, isParsedTextVisible: !state.isParsedTextVisible };
    case ActionTypes.START_EDITING_NOTE:
      return { ...state, isEditing: true, preEditText: state.noteText };
    case ActionTypes.SAVED_NOTE_EDIT:
      return {
        ...state,
        isEditing: false,
        preEditText: state.noteText,
        preEditColor: state.color,
        isParsedTextVisible: true,
      };
    case ActionTypes.CHANGE_COLOR:
      const colorIndex = colors.findIndex((i) => i === state.color);
      return {
        ...state,
        color: colors[colorIndex + 1] ? colors[colorIndex + 1] : colors[0],
      };
    case ActionTypes.CANCEL_EDIT:
      return {
        ...state,
        isEditing: false,
        noteText: state.preEditText,
        isParsedTextVisible: true,
        color: state.preEditColor,
      };
    default:
      return state;
  }
};
