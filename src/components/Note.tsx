import React, { useState } from "react";
import {
  FaPen as EditIcon,
  FaTrashAlt as DeleteIcon,
  FaCheck as ConfirmIcon,
  FaTimes as XIcon,
} from "react-icons/fa";

type Props = {
  content: string;
  onRequestDelete: () => void;
};

const EditNote: React.FC<Props> = ({ content, onRequestDelete }) => {
  const [editing, setEditing] = useState(false);
  const [textContent, setTextContent] = useState(content);
  const [rows, setRows] = useState(content.split("\n").length);

  const markedDownContent = (content: string): JSX.Element => {
    content = content.replace(
      /![ ].+[ ]?.\n/,
      (x) => `<h1 class="text-3xl">${x.substr(1, x.length)}</h1>`
    );

    content = content.replace(
      /~~.+~~/,
      (x) => `<span class="line-through">${x.substr(2, x.length - 4)}</span>`
    );

    content = content.replace(
      /__.+__/,
      (x) =>
        `<span class="underline">${x.trim().substr(2, x.length - 4)}</span>`
    );

    content = content.replace(
      /''.+''/,
      (x) =>
        `<span class="font-bold">${x.trim().substr(2, x.length - 4)}</span>`
    );

    content = content.replace("\n", "<br>");

    return (
      <>
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
      </>
    );
  };

  return (
    <>
      {!editing ? (
        <div className="note shadow rounded-sm p-5 border text-gray-900 w-full">
          <div className="buttons flex flex-row justify-start items-center mb-2">
            <button className="edit h-8 hover:text-blue-600 cursor-pointer inline-block">
              <EditIcon
                className="h-full w-full"
                onClick={() => setEditing(true)}
              />
            </button>
            <button
              className="delete h-8 hover:text-red-600 cursor-pointer ml-3"
              onClick={onRequestDelete}
            >
              <DeleteIcon className="h-full w-full" />
            </button>
          </div>
          <div className="content font-serif">{markedDownContent(content)}</div>
        </div>
      ) : (
        <div className="note shadow rounded-sm p-5 border text-gray-900 w-full">
          <div className="buttons flex flex-row justify-end items-center mb-2">
            <button className="edit h-8 hover:text-green-500 cursor-pointer">
              <ConfirmIcon className="h-full w-full" />
            </button>
            <button className="delete h-8 hover:text-red-600 cursor-pointer ml-3">
              <XIcon
                className="h-full w-full"
                onClick={() => setEditing(false)}
              />
            </button>
          </div>
          <textarea
            onChange={(e) => {
              setRows(e.target.value.split("\n").length);
              setTextContent(e.target.value);
            }}
            className="w-full h-full resize-none bg-gray-100 font-mono"
            name=""
            id=""
            rows={rows + 1}
            value={textContent}
          ></textarea>
        </div>
      )}
    </>
  );
};

export default EditNote;
