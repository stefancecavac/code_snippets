import React, { useContext, useState } from "react";
import ToastComponent from "../components/ToastComponent";

type ToastDataType = {
  type: "SUCCESS" | "ERROR";
  message: string;
};

type ToastContextType = {
  showToast: (toastData: ToastDataType | undefined) => void;
};

export const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export const ToastContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = useState<ToastDataType | undefined>(undefined);
  return (
    <ToastContext.Provider value={{ showToast: (toastDataType) => setToast(toastDataType) }}>
      {toast && <ToastComponent type={toast.type} message={toast.message} onClose={() => setToast(undefined)} />}
      {children}
    </ToastContext.Provider>
  );
};

export const UseToastContext = () => {
  const context = useContext(ToastContext);
  return context as ToastContextType;
};
