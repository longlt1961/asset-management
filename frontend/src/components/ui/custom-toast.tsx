import { X } from "lucide-react";

interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

export const CustomToast = ({ message, type, onClose }: ToastProps) => {
  return (
    <div className={`toast-message toast-${type}`}>
      <div className="flex-1">{message}</div>
      <button onClick={onClose} className="ml-4">
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export const showToast = (message: string, type: "success" | "error") => {
  const container = document.getElementById("toast-container");
  if (!container) {
    const newContainer = document.createElement("div");
    newContainer.id = "toast-container";
    newContainer.className = "toast-container";
    document.body.appendChild(newContainer);
  }

  const toast = document.createElement("div");
  const toastId = `toast-${Date.now()}`;
  toast.id = toastId;

  const removeToast = () => {
    const toastElement = document.getElementById(toastId);
    if (toastElement) {
      toastElement.remove();
    }
  };

  document.getElementById("toast-container")?.appendChild(toast);

  const cleanup = () => {
    setTimeout(removeToast, 5000);
  };

  cleanup();
};