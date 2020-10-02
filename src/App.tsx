import React, { useReducer } from "react";
import Note from "./components/Note";
// import { Transition } from "react-transition-group";
import "./assets/main.css";

{
  // const defaultStyle = {
  //   transition: "transform 350ms, opacity 350ms, max-height 1750ms",
  // };
  // const transitionStyles: any = {
  //   entering: {
  //     transform: "translateY(-25%)",
  //     opacity: 0,
  //   },
  //   entered: { transform: "translateY(0)", opacity: 1 },
  //   exiting: { transform: "translateX(-100%)", opacity: 0 },
  // };
}

{
  /* <Transition
  in={entered}
  timeout={{
    appear: 1000,
    enter: 0,
    exit: 350,
  }}
  unmountOnExit
>
  {(state) => (
    <div
      style={{
        ...defaultStyle,
        ...transitionStyles[state],
      }}
    >
      <Note />
    </div>
  )}
</Transition> */
}

type action = {
  type: string;
  noteID?: number;
};

type note = {
  content: string;
  id: number;
};

type State = note[];

const reducer = (state: State, action: action): State => {
  switch (action.type) {
    case "DELETE_NOTE":
      return state.filter((i) => i.id !== action.noteID);
    case "ADD_NOTE":
      return [
        ...state,
        // pseudo unique id
        { content: "! New note", id: Math.ceil(Math.random() * 150) },
      ];

    default:
      return state;
  }
};

function App() {
  const [notes, dispatch] = useReducer(reducer, [
    {
      content:
        "! Title\nThis __is  underlined     __, and this is ~~crossed out~~, this is\n ''bold''",
      id: 1,
    },
  ]);
  return (
    <div className="App p-4 w-full text-gray-900">
      <div className="grid items-start auto-grow-1 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4 lg:gap-6 justify-center mb-6">
        {notes.map(({ content, id }) => {
          return (
            <Note
              key={id}
              onRequestDelete={() =>
                dispatch({ type: "DELETE_NOTE", noteID: id })
              }
              content={content}
            />
          );
        })}
      </div>
      <button
        onClick={() => dispatch({ type: "ADD_NOTE" })}
        className="ml-auto mr-auto block w-full lg:w-3/4 xl:w-2/4 rounded hover:b bg-teal-300 p-2 text-lg"
      >
        New Note
      </button>
    </div>
  );
}

export default App;
