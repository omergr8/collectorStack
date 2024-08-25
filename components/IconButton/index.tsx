import React from "react";
import styles from "./IconButton.module.css";
import { IconButtonProps } from "@/constants/types";

const IconButton: React.FC<IconButtonProps> = ({
  text,
  Icon,
  iconPosition = "left",
  borderRadius = "4px",
  paddingX = "16px",
  backgroundColor,
  hoverColor,
  width = "unset",
  color,
  onClick,
}) => {
  return (
    <button
      className={`${styles.button} d-flex align-items-center justify-content-center border-0 outline-0 cursor-pointer`}
      style={
        {
          borderRadius,
          paddingLeft: paddingX,
          paddingRight: paddingX,
          backgroundColor,
          color,
          width,
          "--hover-color": hoverColor,
        } as React.CSSProperties
      }
      onClick={onClick}
    >
      {iconPosition === "left" && Icon && <Icon className={styles.icon} />}
      <span className={styles.text}>{text}</span>
      {iconPosition === "right" && Icon && <Icon className={styles.icon} />}
    </button>
  );
};

export default IconButton;
