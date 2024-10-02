import { useEffect } from "react";

const ToastComponent = ({
  type,
  message,
  onClose,
}: {
  type: "SUCCESS" | "ERROR";
  message: string;
  onClose: () => void;
}) => {
  const toastStyle = {
    SUCCESS: "bg-green-500",
    ERROR: "bg-red-300",
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div
      className={`p-5 z-50 flex absolute bottom-5 right-5 rounded-lg ${toastStyle[type]}`}
    >
      <p className="text-white ">{message}</p>
    </div>
  );
};

export default ToastComponent;
