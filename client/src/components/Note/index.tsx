import React, { useReducer } from "react";
import { motion } from "framer-motion";
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
import { markedDownContent } from "./utils";
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
import { Note as note } from "./types";

export type Props = {
  content: note;
  onRequestDelete: () => void;
  onEdited: (note: note) => void;
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
    const sameNoteAsBeforeEdit =
      preEditColor === color && preEditText === noteText;

    if (!sameNoteAsBeforeEdit) {
      onEdited({
        text: noteText,
        _id: content._id,
        color: color,
      });
    }
    dispatch(savedNoteEdit);
  };

  const variation = {
    hidden: { y: 50, opacity: 0 },
    show: { y: 0, opacity: 1 },
    exit: {
      x: -100,
      height: 0,
      overflow: "visible",
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      variants={variation}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <div
        style={{ background: color }}
        className="shadow transition-shadow duration-100 hover:shadow-lg p-5 rounded text-gray-900 w-full"
      >
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
                className="hover:text-orange-600"
                onClick={() => dispatch(changeColor)}
                icon={PaletteIcon}
              />
              <IconButton
                title="Hide Preview"
                className="hover:text-teal-700"
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
          <div className="font-serif break-words">
            {markedDownContent(noteText)}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Note;
