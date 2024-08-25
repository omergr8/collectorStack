import React from "react";
import styles from "./Button.module.css";
import { ButtonProps } from "@/constants/types";
import Spinner from "../Spinner";

const Button: React.FC<ButtonProps> = ({
  type = "primary",
  customClass,
  onClick,
  children,
  borderRadius = "8px",
  paddingX = "50px",
  disabled = false,
  loading = false,
}) => {
  let buttonClass;
  switch (type) {
    case "secondary":
      buttonClass = `${styles.button} ${styles.buttonSecondary} d-flex align-items-center justify-content-center position-relative text-center cursor-pointer`;
      break;
    case "dark":
      buttonClass = `${styles.button} ${styles.buttonDark} d-flex align-items-center justify-content-center position-relative text-center cursor-pointer`;
      break;
    case "primary":
    default:
      buttonClass = `${styles.button} ${styles.buttonPrimary} d-flex align-items-center justify-content-center position-relative text-center cursor-pointer`;
      break;
  }

  return (
    <button
      className={`${buttonClass} ${customClass} ${
        disabled ? styles.buttonDisabled : ""
      } d-flex align-items-center justify-content-center gap-2`} // Add the disabled class
      style={{
        borderRadius,
        paddingLeft: paddingX,
        paddingRight: paddingX,
      }}
      onClick={!disabled ? onClick : undefined} // Prevent onClick if disabled
      disabled={disabled} // Pass the disabled prop to the button element
    >
      <p className="mb-0">{children}</p>
      {loading && (
        <div className={styles.spinnerPlaceholder}>
          <Spinner isButton={true} size="small" />
        </div>
      )}
    </button>
  );
};

export default Button;
