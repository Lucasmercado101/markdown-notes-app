import React from "react";
import { FaCheck as ConfirmIcon, FaTimes as XIcon } from "react-icons/fa";

const Note: React.FC = () => {
  return (
    <div className="note shadow border rounded-sm p-5 text-gray-900 w-full">
      <div className="buttons flex flex-row justify-end items-center">
        <div className="edit h-8 hover:text-green-500 cursor-pointer">
          <ConfirmIcon className="h-full w-full" />
        </div>
        <div className="delete h-8 hover:text-red-600 cursor-pointer ml-3">
          <XIcon className="h-full w-full" />
        </div>
      </div>
      <div className="content font-serif">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos
        ducimus id accusamus quaerat enim cupiditate repudiandae voluptates
        doloribus, modi qui tenetur quis vero ea reprehenderit esse maiores
        delectus aperiam. Quisquam!Porro corporis quia exercitationem, veniam
        voluptates eum recusandae numquam delectus nulla aut assumenda nostrum
        asperiores? Alias cum, laborum odio veniam omnis aliquid dolorem
        dignissimos enim amet, accusamus eligendi consectetur recusandae.
      </div>
    </div>
  );
};

export default Note;
