import React, { useState } from "react";
import { FaQuestion as QuestionIcon } from "react-icons/fa";
import MyModal from "./MyModal";

const HelpButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  return (
    <>
      <button
        style={{ right: "20px", top: "20px" }}
        className="shadow-md absolute rounded-full bg-teal-100 h-12 w-12 md:h-16 md:w-16 grid place-items-center"
        onClick={() => setIsModalOpen(true)}
      >
        <QuestionIcon className="w-3/5 h-auto text-gray-500 outline-none" />
      </button>
      <MyModal
        onRequestClose={() => setIsModalOpen(false)}
        isOpen={isModalOpen}
      >
        <div className="wrapper w-full h-full grid place-items-center">
          <div className="bg-white w-full md:w-10/12 mx-auto md:p-6 p-4">
            <h2 className="text-center text-4xl mb-3 underline">Markup</h2>
            <div>
              <code className="bg-gray-200 p-1">~~strikethrough~~</code> ={" "}
              <span className="line-through">strikethrough</span>
            </div>
            <br />
            <div>
              <code className="bg-gray-200 p-1">__underline__</code> ={" "}
              <span className="underline">strikethrough</span>
            </div>
            <br />
            <div>
              <code className="bg-gray-200 p-1">''bold''</code> ={" "}
              <span className="font-bold">strikethrough</span>
            </div>
            <br />
            <div>
              <code className="bg-gray-200 p-1">! header 1</code> ={" "}
              <h1 className="inline-block text-3xl">header 1</h1>
            </div>
            <br />
            <div>
              <code className="bg-gray-200 p-1">! header 2</code> ={" "}
              <h1 className="inline-block text-2xl">header 2</h1>
            </div>
            <br />
            <div>
              <code className="bg-gray-200 p-1">! header 3</code> ={" "}
              <h1 className="inline-block text-xl">header 3</h1>
            </div>
            <br />
            <div>
              <code className="bg-gray-200 p-1">[[url|link]]</code> ={" "}
              <a
                className="text-blue-600 hover:text-blue-800 underline"
                href="https://lucasmercado101.github.io"
                rel="noopener noreferrer"
                target="_blank"
              >
                lucasmercado101.github.io
              </a>
            </div>
            <hr className="my-5" />
            <a
              className="text-blue-600 hover:text-blue-800 underline"
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
            <a
              className="text-blue-600 hover:text-blue-800 underline"
              href="https://www.w3schools.com/TAGs/"
              rel="noopener noreferrer"
              target="_blank"
            >
              HTML Tags
            </a>{" "}
            (with no styles)
            <button
              className="ml-auto mr-auto block bg-teal-800 hover:bg-teal-600 w-3/5 py-1 mt-6 text-lg rounded-md text-white"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      </MyModal>
    </>
  );
};

export default HelpButton;
