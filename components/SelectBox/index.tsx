// components/SelectBox.tsx
import React from "react";
import styles from "./SelectBox.module.css";
import ArrowDownIcon from "@/public/icons/arrowDown.svg"; // Import your arrow icon
import { SelectBoxProps } from "@/constants/types";

const SelectBox: React.FC<SelectBoxProps> = ({
  label,
  value,
  onChange,
  options,
  lineColor = "green",
  error,
  required = false,
}) => {
  const selectId = `select-${label.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div className={`${styles.inputContainer} position-relative w-100`}>
      <label className={styles.inputLabel} htmlFor={selectId}>
        {label} {required && <span className="required">*</span>}
      </label>
      <div className="d-flex align-items-center h-100 position-relative">
        <div className={error ? styles.redLine : styles.greenLine}></div>
        <div className={styles.selectBoxWrapper}>
          <select
            id={selectId}
            className={`${styles.inputBox} ${styles.selectBox} ${
              error ? styles.errorInputBox : ""
            }`}
            value={value}
            onChange={onChange}
          >
            <option value="" disabled>
              {label}
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ArrowDownIcon className={`logoStroke ${styles.selectArrow}`} />
        </div>
      </div>
      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  );
};

export default SelectBox;
