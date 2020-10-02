import React, { useReducer } from "react";
import { note } from "./types";
import {
  FaPen as EditIcon,
  FaTrashAlt as DeleteIcon,
  FaCheck as ConfirmIcon,
  FaTimes as XIcon,
  FaEye as ShowIcon,
  FaEyeSlash as HideIcon,
} from "react-icons/fa";

enum actionTypes {
  SET_ROWS,
  TOGGLE_PARSED_TEXT,
  SAVED_NOTE_EDIT,
  TOGGLE_NOTE_EDIT,
  CANCEL_EDIT,
  SET_EDIT_TEXT,
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
  noteText: string;
};

const reducer = (state: State, action: action): State => {
  switch (action.type) {
    case actionTypes.SET_ROWS:
      return { ...state, rows: action.text!.split(/\r\n|\r|\n/g).length + 1 };
    case actionTypes.TOGGLE_PARSED_TEXT:
      return { ...state, isParsedTextVisible: !state.isParsedTextVisible };
    case actionTypes.TOGGLE_NOTE_EDIT:
      return { ...state, isEditing: true, preEditText: state.noteText };
    case actionTypes.SAVED_NOTE_EDIT:
      return {
        ...state,
        isEditing: false,
        preEditText: state.noteText,
        isParsedTextVisible: true,
      };
    case actionTypes.CANCEL_EDIT:
      return {
        ...state,
        isEditing: false,
        noteText: state.preEditText,
        isParsedTextVisible: true,
      };
    case actionTypes.SET_EDIT_TEXT:
      return { ...state, noteText: action.text! };
    default:
      return state;
  }
};

const Note: React.FC<Props> = ({ content, onRequestDelete, onEdited }) => {
  const initialState: State = {
    rows: content.text.split("\n").length + 1,
    isParsedTextVisible: true,
    isEditing: false,
    preEditText: content.text,
    noteText: content.text,
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const { rows, isParsedTextVisible, isEditing, noteText } = state;

  return (
    <div className="shadow hover:shadow-lg rounded-sm p-5 border text-gray-900 w-full">
      <>
        <div className="flex flex-row justify-start items-center mb-2">
          {isEditing ? (
            <>
              <button className="h-8 hover:text-green-500 cursor-pointer">
                <ConfirmIcon
                  title="Apply changes"
                  className="h-full w-full"
                  onClick={() => {
                    onEdited({ text: noteText, id: content.id });
                    dispatch({ type: actionTypes.SAVED_NOTE_EDIT });
                  }}
                />
              </button>
              <button
                title="Hide Preview"
                className="h-8 cursor-pointer ml-3 hover:text-orange-700"
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
                className="h-8 hover:text-red-600 cursor-pointer ml-3"
              >
                <XIcon
                  className="h-full w-full"
                  onClick={() => dispatch({ type: actionTypes.CANCEL_EDIT })}
                />
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
              dispatch({ type: actionTypes.SET_ROWS, text: e.target.value });
              dispatch({
                type: actionTypes.SET_EDIT_TEXT,
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
