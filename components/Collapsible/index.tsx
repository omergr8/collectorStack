import React, { useState, useEffect } from "react";
import DownArrow from "@/public/icons/redDownArrow.svg";
import UpArrow from "@/public/icons/redUpArrow.svg";
import styles from "./Collapsible.module.css";
import { CollapsibleProps } from "@/constants/types";

const Collapsible: React.FC<CollapsibleProps> = ({
  text,
  children,
  isSidebar,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    if (isSidebar) {
      if (isOpen) {
        document.documentElement.style.overflow = "hidden";
      } else {
        document.documentElement.style.overflow = "unset";
      }

      // Cleanup function to reset overflow when the component unmounts
      return () => {
        document.documentElement.style.overflow = "unset";
      };
    }
  }, [isOpen]);
  return (
    <div>
      {isOpen && isSidebar && (
        <div className={styles.overlay2} onClick={toggleCollapse} />
      )}
      <div className={`${styles.collapsible} ${isOpen ? styles.open : ""}`}>
        <div className={styles.header} onClick={toggleCollapse}>
          <span>{text}</span>
          {isOpen ? <UpArrow /> : <DownArrow />}
        </div>
      </div>
      {isOpen && (
        <div
          className={`${styles.content} ${isSidebar && styles.stickyContent}`}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Collapsible;
