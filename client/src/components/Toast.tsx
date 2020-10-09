import React, { useEffect } from "react";
import { FaTimesCircle as ErrorIcon } from "react-icons/fa";
import { motion, Variants } from "framer-motion";

export const animation: Variants = {
  hidden: { y: "-100%", marginTop: "0rem", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    marginTop: "0.5rem",
    transition: { duration: 0.4 },
  },
  dissapear: {
    y: "100%",
    marginTop: "0rem",
    opacity: 0,
    height: 0,
    overflow: "visible",
    transition: { duration: 0.3 },
  },
};

const Toast: React.FC<{ OnRequestClose: () => void }> = ({
  OnRequestClose,
  children,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      OnRequestClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [OnRequestClose]);

  return (
    <motion.div
      variants={animation}
      initial="hidden"
      animate="visible"
      exit="dissapear"
    >
      <div className="w-full  rounded-lg flex flex-row items-center bg-red-200 text-red-800 p-3">
        <ErrorIcon
          onClick={OnRequestClose}
          className="w-10 md:w-8 h-auto mr-2 cursor-pointer"
        />
        <p className="w-full h-full">{children}</p>
      </div>
    </motion.div>
  );
};

export default Toast;
