import React, { useEffect, useLayoutEffect, useState } from "react";
import { FaBars as HamburgerIcon, FaPlus, FaQuestion } from "react-icons/fa";
import { BiLogOut as LogOutButton } from "react-icons/bi";
import HelpModal from "../../components/HelpModal";
import { AnimatePresence, motion, Variants } from "framer-motion";
import useViewportDimensions from "../../hooks/ViewportSize";

const variant: Variants = {
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

const Menu: React.FC<{
  onRequestAddNewNote: () => void;
  onRequestLogOut: () => void;
}> = ({ onRequestAddNewNote, onRequestLogOut }) => {
  const { width } = useViewportDimensions();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToggleMenu, setShowToggleMenu] = useState(true);
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  useLayoutEffect(() => {
    if (width < 768) {
      setMenuIsOpen(true);
      setShowToggleMenu(false);
    } else {
      setShowToggleMenu(true);
    }
  }, [width]);

  return (
    <>
      <motion.div
        variants={variant}
        initial={false}
        animate={menuIsOpen ? "open" : "closed"}
        className="h-20 md:h-24 text-black-100 bg-orange-200 border border-gray-400 shadow-md absolute left-0 px-0 py-4 md:py-4 right-0 max-w-screen-lg flex flex-row-reverse  md:flex-row justify-evenly items-center bottom-0 my-4 mx-2 md:mx-5 rounded-full "
      >
        {showToggleMenu && (
          <button
            onClick={() => setMenuIsOpen(!menuIsOpen)}
            className="w-auto h-full relative overflow-hidden"
          >
            <HamburgerIcon className="w-full h-full " />
          </button>
        )}
        <AnimatePresence>
          {menuIsOpen && (
            <>
              <motion.button
                whileHover={{
                  scale: [1, 1.1, 1, 1.1],
                  origin: "center",
                }}
                onClick={onRequestAddNewNote}
                variants={variant}
                initial="hidden"
                animate="visible"
                exit="exit"
                style={{ right: "20px", bottom: "20px" }}
                className=" h-full w-auto "
                title="New note"
              >
                <FaPlus className="h-full w-auto" />
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
                onClick={() => setIsModalOpen(true)}
              >
                <FaQuestion className="h-full w-auto " />
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
                onClick={onRequestLogOut}
              >
                <LogOutButton className="h-full w-auto " />
              </motion.button>
            </>
          )}
        </AnimatePresence>
      </motion.div>
      {isModalOpen && (
        <HelpModal
          isModalOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default Menu;
