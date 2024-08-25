import React from "react";
import styles from "./Spinner.module.css"; // Import the CSS module

// Define an interface for the component's props
interface SpinnerProps {
  size?: "small" | "medium" | "large";
  isButton?: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({
  size = "large",
  isButton = false,
}) => {
  return (
    <div
      className={`d-flex justify-content-center align-items-center h-100 w-100 position-relative ${
        isButton ? styles.buttonContainer : ""
      }`}
    >
      <div className={`${styles.spinner} ${styles[size]}`}></div>
    </div>
  );
};

export default Spinner;
