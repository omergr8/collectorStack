import React from "react";
import styles from "./Popup.module.css";
import CrossIcon from "@/public/icons/cross2.svg"; // Import your cross icon here
import { PopupProps } from "@/constants/types";

const Popup: React.FC<PopupProps> = ({
  isOpen,
  onClose,
  minWidth = "unset",
  maxWidth = "unset",
  borderRadius = "10px",
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className={`${styles.overlay} d-flex align-items-center justify-content-center`}
    >
      <div
        className={styles.popup}
        style={{ minWidth, maxWidth, borderRadius }}
      >
        <div className={styles.closeIcon} onClick={onClose}>
          <CrossIcon className={styles.crossIcon} />
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default Popup;
