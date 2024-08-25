import React from "react";
import styles from "./CustomInput.module.css";
import Elippses from "@/public/icons/ellipses.svg";
import { CustomInputProps } from "@/constants/types";

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  placeholder,
  value,
  lineColor = "green",
  onChange,
  error,
  type = "text", // Default type is text
  required = false,
}) => {
  const inputId = `input-${label.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div className={`${styles.inputContainer} position-relative w-100`}>
      <label className={styles.inputLabel} htmlFor={inputId}>
        {label} {required && <span className="required">*</span>}
      </label>
      <div className="d-flex align-items-center h-100 position-relative">
        <div className={error ? styles.redLine : styles.greenLine}></div>

        <input
          id={inputId}
          type={type}
          className={`${styles.inputBox} ${error ? styles.errorInputBox : ""}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {error && (
          <div
            className={`${styles.errorIcon} d-flex align-items-center justify-content-center`}
          >
            <Elippses />
          </div>
        )}
      </div>
      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  );
};

export default CustomInput;
