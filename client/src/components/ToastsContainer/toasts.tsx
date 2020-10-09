import { useState } from "react";
import { createContainer } from "unstated-next";
import newUUID from "react-uuid";

type ToastType = {
  id: string;
  message: string;
};

function useToasts() {
  const [toasts, setToasts] = useState<ToastType[]>([]);
  const removeToast = (id: string) =>
    setToasts((j) => j.filter((n) => n.id !== id));
  const newToast = (message: string) =>
    setToasts((oldToasts) => [...oldToasts, { id: newUUID(), message }]);
  return { toasts, removeToast, newToast };
}

const Toasts = createContainer(useToasts);

export default Toasts;
