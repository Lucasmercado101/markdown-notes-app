import React from "react";
import { AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import Toast from "../Toast";
import Toasts from "./toasts";

const ToastContainer = () => {
  const { toasts, removeToast } = Toasts.useContainer();

  return createPortal(
    <div className="absolute right-0 top-0 md:left-auto w-full md:max-w-xl p-2">
      <AnimatePresence>
        {toasts.length > 0 &&
          toasts.map((i) => (
            <Toast key={i.id} OnRequestClose={() => removeToast(i.id)}>
              {i.message}
            </Toast>
          ))}
      </AnimatePresence>
    </div>,
    document.getElementById("toast")!
  );
};

export default ToastContainer;
