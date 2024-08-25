import React, { ReactNode } from "react";
import { Slide, toast, ToastContainer, ToastOptions } from "react-toastify";
import AlertIcon from "@/public/icons/toast/alert.svg";
import ApproveIcon from "@/public/icons/toast/approve.svg";
import RejectIcon from "@/public/icons/toast/reject.svg";

// Define types for the toaster functions
type Toaster = {
  success: (msg: string | ReactNode, options?: ToastOptions) => void;
  warning: (msg: string | ReactNode, options?: ToastOptions) => void;
  error: (msg: string | ReactNode, options?: ToastOptions) => void;
  info: (msg: string | ReactNode, options?: ToastOptions) => void;
};

const defaultOptions: ToastOptions = {
  position: "bottom-right",
  autoClose: 2000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  transition: Slide,
};

// Toaster implementation
const toaster: Toaster = {
  success: (msg, options = {}) => {
    toast.success(msg, {
      ...defaultOptions,
      ...options,
      icon: <ApproveIcon />,
    });
  },
  warning: (msg, options = {}) => {
    toast.warning(msg, {
      ...defaultOptions,
      ...options,
      icon: <AlertIcon />,
    });
  },
  error: (msg, options = {}) => {
    toast.error(msg, {
      ...defaultOptions,
      ...options,
      icon: <RejectIcon />,
    });
  },
  info: (msg, options = {}) => {
    toast.info(msg, {
      ...defaultOptions,
      ...options,
      icon: <AlertIcon />,
    });
  },
};

// Main component for the Toast container
export const ToastStyled: React.FC = () => {
  return <ToastContainer className="toast-container" />;
};

// Export toaster as default
export default toaster;
