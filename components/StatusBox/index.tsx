import React from "react";
import styles from "./StatusBox.module.css";
import CrossIcon from "@/public/icons/smallCross.svg";
import MinusIcon from "@/public/icons/minus.svg";

interface StatusBoxProps {
  text: string;
  status: string;
}

const StatusBox: React.FC<StatusBoxProps> = ({ text, status }) => {
  return (
    <div
      className={`${styles.statusBox} ${
        status === "rejected" ? styles.rejected : styles.pending
      } d-flex align-items-center justify-content-between`}
    >
      <p className={styles.text}>{text}</p>
      <div
        className={`${styles.iconBox} ${
          status === "rejected" ? styles.redIconBox : styles.yellowIconBox
        } d-flex align-items-center justify-content-center`}
      >
        {status === "rejected" ? <CrossIcon /> : <MinusIcon />}
      </div>
    </div>
  );
};

export default StatusBox;
