import React, { useState } from "react";
import { FaBars as HamburgerIcon, FaPlus, FaQuestion } from "react-icons/fa";
import { BiLogOut as LogOutButton } from "react-icons/bi";
import { AnimatePresence, motion } from "framer-motion";

// const variant = {
//   closed: { opacity: 1, width: "auto", background: "red" },
//   open: { opacity: 1, width: "auto", background: "blue" },
//   exit: { opacity: 0 },
// };

const variant = {
  closed: {
    width: "6rem",
    transition: { type: "tween" },
  },
  open: {
    width: "auto",
  },
  hidden: { width: 0, opacity: 0 },
  visible: { width: "auto", opacity: 1 },
  exit: {
    opacity: 0,
    width: 0,
    transition: { duration: 0.3 },
  },
};

function Menu() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  return (
    <motion.div
      variants={variant}
      initial={false}
      //   animate={menuIsOpen ? "open" : "open"}
      animate={menuIsOpen ? "open" : "closed"}
      className="h-24 absolute left-0 p-4 right-0 max-w-screen-lg flex flex-row justify-evenly items-center bottom-0 my-5 mx-1 md:mx-5 rounded-full bg-blue-600"
    >
      <button
        onClick={() => setMenuIsOpen(!menuIsOpen)}
        className="w-auto h-full"
      >
        <HamburgerIcon className="w-full h-full text-white" />
      </button>
      <AnimatePresence>
        {menuIsOpen && (
          <>
            <motion.button
              whileHover={{
                scale: [1, 1.1, 1, 1.1],
                origin: "center",
              }}
              variants={variant}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{ right: "20px", bottom: "20px" }}
              className=" h-full w-auto "
              title="New note"
            >
              <FaPlus className="h-full w-auto text-white" />
            </motion.button>

            <motion.button
              whileHover={{
                rotate: [0, 20, 0, 20, 0],
                scale: 1.1,
                origin: "center",
              }}
              variants={variant}
              initial="hidden"
              animate="visible"
              className=" h-full w-auto "
              exit="exit"
              title="Help"
            >
              <FaQuestion className="h-full w-auto text-white" />
            </motion.button>
            <motion.button
              whileHover={{
                x: [0, -5, 5, 0],
                scale: 1.1,
                origin: "center",
              }}
              variants={variant}
              initial="hidden"
              animate="visible"
              className=" h-full w-auto "
              exit="exit"
              title="Log out"
            >
              <LogOutButton className="h-full w-auto text-white" />
            </motion.button>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Menu;
