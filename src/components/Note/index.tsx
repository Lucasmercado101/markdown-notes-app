import React, { useReducer } from "react";
import {
  FaPen as EditIcon,
  FaTrashAlt as DeleteIcon,
  FaCheck as ConfirmIcon,
  FaTimes as XIcon,
  FaEye as ShowIcon,
  FaEyeSlash as HideIcon,
  FaPalette as PaletteIcon,
} from "react-icons/fa";
import IconButton from "./IconButton";
import { State } from "./useReducer/reducer";
import { reducer } from "./useReducer/reducer";
import {
  changeColor,
  cancelEdit,
  startEditingNote,
  savedNoteEdit,
  toggleParsedText,
  onTextEdit,
} from "./useReducer/actions";

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

export type Note = {
  text: string;
  id: number;
  color: string;
};

export type Props = {
  content: Note;
  onRequestDelete: () => void;
  onEdited: (note: Note) => void;
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

  const onApplyChanges = () => {
    const hasNotChanged = preEditColor === color && preEditText === noteText;

    !hasNotChanged &&
      onEdited({
        text: noteText,
        id: content.id,
        color: color,
      });
    dispatch(savedNoteEdit);
  };

  return (
    <div
      style={{ background: color }}
      className="shadow transition-shadow duration-100 hover:shadow-lg p-5 rounded text-gray-900 w-full"
    >
      <>
        <div className="flex flex-row justify-end items-center mb-2">
          {isEditing ? (
            <>
              <IconButton
                title="Apply changes"
                className="hover:text-green-600"
                onClick={onApplyChanges}
                icon={ConfirmIcon}
              />
              <IconButton
                title="Change color"
                className="hover:text-green-600"
                onClick={() => dispatch(changeColor)}
                icon={PaletteIcon}
              />
              <IconButton
                title="Hide Preview"
                className="hover:text-teal-600"
                onClick={() => dispatch(toggleParsedText)}
                icon={isParsedTextVisible ? HideIcon : ShowIcon}
              />
              <IconButton
                title="Cancel"
                className="hover:text-red-600"
                onClick={() => dispatch(cancelEdit)}
                icon={XIcon}
              />
            </>
          ) : (
            <>
              <IconButton
                title="Edit note"
                className="hover:text-green-600"
                onClick={() => dispatch(startEditingNote)}
                icon={EditIcon}
              />
              <IconButton
                title="Delete note"
                className="hover:text-red-600 "
                onClick={onRequestDelete}
                icon={DeleteIcon}
              />
            </>
          )}
        </div>
        {isEditing && (
          <textarea
            onChange={(e) => dispatch(onTextEdit(e.target.value))}
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
