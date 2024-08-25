import React from "react";
import styles from "./PercentageBar.module.css";
import { PercentageBarProps } from "@/constants/types";

const PercentageBar: React.FC<PercentageBarProps> = ({
  percentage,
  textPosition = "after",
}) => {
  return (
    <div className='d-flex align-items-center gap-3'>
      {textPosition === "before" && (
        <span className={styles.text}>{percentage}%</span>
      )}
      <div className={styles.progressBarContainer}>
        <div
          className={styles.progressBar}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      {textPosition === "after" && (
        <span className={styles.text}>{percentage}%</span>
      )}
    </div>
  );
};

export default PercentageBar;
