import React, { useReducer } from "react";
import { note } from "./types";
import {
  FaPen as EditIcon,
  FaTrashAlt as DeleteIcon,
  FaCheck as ConfirmIcon,
  FaTimes as XIcon,
  FaEye as ShowIcon,
  FaEyeSlash as HideIcon,
  FaPalette as ChangeColorIcon,
} from "react-icons/fa";

enum actionTypes {
  ON_TEXT_EDIT,
  TOGGLE_PARSED_TEXT,
  SAVED_NOTE_EDIT,
  TOGGLE_NOTE_EDIT,
  CANCEL_EDIT,
  CHANGE_COLOR,
}

type Props = {
  content: note;
  onRequestDelete: () => void;
  onEdited: (note: note) => void;
};

const markedDownContent = (content: string) => {
  content = content.replace(
    /!!![ ].+[ ]?/g,
    (x) => `<h3 class="text-xl">${x.substr(3, x.length)}</h1>`
  );

  content = content.replace(
    /!![ ].+[ ]?/g,
    (x) => `<h2 class="text-2xl">${x.substr(2, x.length)}</h1>`
  );

  content = content.replace(
    /![ ].+[ ]?/g,
    (x) => `<h1 class="text-3xl">${x.substr(1, x.length)}</h1>`
  );

  content = content.replace(
    /~~.+~~/g,
    (x) => `<span class="line-through">${x.substr(2, x.length - 4)}</span>`
  );

  content = content.replace(
    /__.+__/g,
    (x) => `<span class="underline">${x.trim().substr(2, x.length - 4)}</span>`
  );

  content = content.replace(
    /''.+''/g,
    (x) => `<span class="font-bold">${x.trim().substr(2, x.length - 4)}</span>`
  );
  content = content.replace(/\[\[.+\|.+\]\]/g, (x) => {
    let [hypertext, url] = x.split("|");

    hypertext = hypertext.substr(2, hypertext.length);
    url = url.substr(0, url.length - 2);
    return `<a title="${url}" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline" href="${url}" target="_blank">${hypertext.trim()}</a>`;
  });

  content = content.replace(/<script>.*(<\/script>)?/g, (x) => "");
  content = content.replace(/<style>.*(<\/style>)?/g, (x) => "");

  content = content.replace(/\r\n|\r|\n/g, "<br>");

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </>
  );
};

type action = {
  type: number;
  text?: string;
};

type State = {
  rows: number;
  isParsedTextVisible: boolean;
  isEditing: boolean;
  preEditText: string;
  preEditColor: string;
  noteText: string;
  color: string;
};

const reducer = (state: State, action: action): State => {
  switch (action.type) {
    case actionTypes.ON_TEXT_EDIT:
      return {
        ...state,
        rows: action.text!.split(/\r\n|\r|\n/g).length + 1,
        noteText: action.text!,
      };
    case actionTypes.TOGGLE_PARSED_TEXT:
      return { ...state, isParsedTextVisible: !state.isParsedTextVisible };
    case actionTypes.TOGGLE_NOTE_EDIT:
      return { ...state, isEditing: true, preEditText: state.noteText };
    case actionTypes.SAVED_NOTE_EDIT:
      return {
        ...state,
        isEditing: false,
        preEditText: state.noteText,
        preEditColor: state.color,
        isParsedTextVisible: true,
      };
    case actionTypes.CHANGE_COLOR:
      const colors = [
        "#fed7d7",
        "#edf2f7",
        "#feebc8",
        "#c3dafe",
        "#fff",
        "#b2f5ea",
        "#fed7e2",
      ];
      const colorIndex = colors.findIndex((i) => i === state.color);
      return {
        ...state,
        color: colors[colorIndex + 1] ? colors[colorIndex + 1] : colors[0],
      };
    case actionTypes.CANCEL_EDIT:
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

const Note: React.FC<Props> = ({ content, onRequestDelete, onEdited }) => {
  const initialState: State = {
    rows: content.text.split("\n").length + 1,
    isParsedTextVisible: true,
    isEditing: false,
    preEditColor: content.color,
    preEditText: content.text,
    noteText: content.text,
    color: content.color,
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    rows,
    isParsedTextVisible,
    isEditing,
    noteText,
    color,
    preEditColor,
    preEditText,
  } = state;

  return (
    <div
      style={{ background: color }}
      className="shadow transition-shadow duration-100 hover:shadow-lg p-5 rounded text-gray-900 w-full"
    >
      <>
        <div className="flex flex-row justify-start items-center mb-2">
          {isEditing ? (
            <>
              <button className="h-8 hover:text-green-500 cursor-pointer">
                <ConfirmIcon
                  title="Apply changes"
                  className="h-full w-full"
                  onClick={() => {
                    const hasNotChanged =
                      preEditColor === color && preEditText === noteText;

                    !hasNotChanged &&
                      onEdited({
                        text: noteText,
                        id: content.id,
                        color: color,
                      });
                    dispatch({ type: actionTypes.SAVED_NOTE_EDIT });
                  }}
                />
              </button>
              <button
                title="Hide Preview"
                className="h-8 cursor-pointer ml-3 hover:text-teal-500"
                onClick={() =>
                  dispatch({ type: actionTypes.TOGGLE_PARSED_TEXT })
                }
              >
                {isParsedTextVisible ? (
                  <HideIcon className="h-full w-full" />
                ) : (
                  <ShowIcon className="h-full w-full" />
                )}
              </button>
              <button
                title="Cancel"
                onClick={() => dispatch({ type: actionTypes.CANCEL_EDIT })}
                className="h-8 hover:text-red-600 cursor-pointer ml-3"
              >
                <XIcon className="h-full w-full" />
              </button>
              <button
                title="Change color"
                onClick={() => dispatch({ type: actionTypes.CHANGE_COLOR })}
                className="h-6 hover:text-green-600 cursor-pointer ml-3"
              >
                <ChangeColorIcon className="h-full w-full" />
              </button>
            </>
          ) : (
            <>
              <button className="h-8 hover:text-blue-600 cursor-pointer">
                <EditIcon
                  title="Edit note"
                  className="h-full w-full"
                  onClick={() =>
                    dispatch({ type: actionTypes.TOGGLE_NOTE_EDIT })
                  }
                />
              </button>
              <button
                title="Delete note"
                className=" h-8 hover:text-red-600 cursor-pointer ml-3"
                onClick={onRequestDelete}
              >
                <DeleteIcon className="h-full w-full" />
              </button>
            </>
          )}
        </div>
        {isEditing && (
          <textarea
            onChange={(e) => {
              dispatch({
                type: actionTypes.ON_TEXT_EDIT,
                text: e.target.value,
              });
            }}
            className="p-2 w-full h-full resize-none bg-gray-100 font-mono"
            name="noteEdit"
            id="noteEdit"
            rows={rows}
            value={noteText}
          ></textarea>
        )}
        {isEditing && isParsedTextVisible && <hr className="my-4" />}
        {isParsedTextVisible && (
          <div className="font-serif">{markedDownContent(noteText)}</div>
        )}
      </>
    </div>
  );
};

export default Note;
