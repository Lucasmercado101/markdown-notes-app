import React, { useState } from "react";
import { FaQuestion as QuestionIcon } from "react-icons/fa";
import Modal from "react-modal";

const modalStyle: Modal.Styles = {
  overlay: {
    position: "fixed",
    display: "grid",
    placeItems: "center",
    background: "rgba(0, 0, 0, 0.75)",
  },
};

const HelpButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <button
        title="Markdown help"
        style={{ right: "10px", top: "10px" }}
        className="shadow-md absolute rounded-full bg-teal-100 h-12 w-12 grid place-items-center"
        onClick={() => setIsModalOpen(true)}
      >
        <QuestionIcon className="w-3/5 h-auto text-gray-500 outline-none" />
      </button>
      <Modal
        style={modalStyle}
        className="bg-white overflow-auto max-h-full w-full text-sm md:text-base md:max-w-2xl mx-auto"
        onRequestClose={() => {
          return setIsModalOpen(false);
        }}
        isOpen={isModalOpen}
      >
        <div className="md:p-6 p-4">
          <h2 className="text-center md:text-4xl text-3xl mb-3 underline">
            Markup
          </h2>
          <div className="flex items-center">
            <code className="bg-gray-200 p-1 mr-2">~~strikethrough~~</code> ={" "}
            <span className="line-through ml-2">strikethrough</span>
          </div>
          <br />
          <div className="flex items-center">
            <code className="bg-gray-200 p-1 mr-2">__underline__</code> ={" "}
            <span className="underline ml-2">underline</span>
          </div>
          <br />
          <div className="flex items-center">
            <code className="bg-gray-200 p-1 mr-2">''bold''</code> ={" "}
            <span className="font-bold ml-2">bold</span>
          </div>
          <br />
          <div className="flex items-center">
            <code className="bg-gray-200 p-1 mr-2">! header 1</code> ={" "}
            <h1 className="inline-block text-3xl ml-2">header 1</h1>
          </div>
          <br />
          <div className="flex items-center">
            <code className="bg-gray-200 p-1 mr-2">! header 2</code> ={" "}
            <h1 className="inline-block text-2xl ml-2">header 2</h1>
          </div>
          <br />
          <div className="flex items-center">
            <code className="bg-gray-200 p-1 mr-2">! header 3</code> ={" "}
            <h1 className="inline-block text-xl ml-2">header 3</h1>
          </div>
          <br />
          <div className="flex items-center">
            <code className="bg-gray-200 p-1 mr-2">[[url|link]]</code> ={" "}
            <a
              className="text-blue-600 hover:text-blue-800 underline ml-2"
              title="https://lucasmercado101.github.io"
              href="https://lucasmercado101.github.io"
              rel="noopener noreferrer"
              target="_blank"
            >
              lucasmercado101.github.io
            </a>
          </div>
          <hr className="my-5" />
          <a
            className="text-blue-600 hover:text-blue-800 underline inline"
            title="https://www.w3schools.com/html/html_entities.asp"
            href="https://www.w3schools.com/html/html_entities.asp"
            rel="noopener noreferrer"
            target="_blank"
          >
            HTML Entities
          </a>
          :
          <ul className="ml-6 list-disc">
            <li className="my-3">
              <code className="bg-gray-200 p-1">&amp;copy;</code> = &copy;
            </li>
            <li className="my-3">
              <code className="bg-gray-200 p-1">&amp;yen;</code> = &yen;
            </li>
            <li className="my-3">
              <code className="bg-gray-200 p-1">&amp;pound;</code> = &pound;
            </li>
            <li className="my-3">
              <code className="bg-gray-200 p-1">&amp;cent;</code> = &cent;
            </li>
          </ul>
          <button
            className="ml-auto mr-auto block bg-teal-800 hover:bg-teal-600 w-full md:w-3/5 py-1 mt-6 text-lg rounded-md text-white"
            onClick={() => setIsModalOpen(false)}
          >
            Close
          </button>
        </div>
      </Modal>
    </>
  );
};

export default HelpButton;
