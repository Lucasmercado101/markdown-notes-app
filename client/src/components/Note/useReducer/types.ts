export enum ActionTypes {
  ON_TEXT_EDIT,
  TOGGLE_PARSED_TEXT,
  SAVED_NOTE_EDIT,
  START_EDITING_NOTE,
  CANCEL_EDIT,
  CHANGE_COLOR,
}

export type Action = {
  type: number;
};

export type TextEditAction = {
  text: string;
} & Action;
