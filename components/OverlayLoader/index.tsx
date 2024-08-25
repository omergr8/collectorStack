import React from "react";
import styles from "./OverlayLoader.module.css";
import LoaderIcon from "@/public/icons/loader/loader.svg";

interface OverlayLoaderProps {
  text?: number; // Optional text below the spinner
}

const OverlayLoader: React.FC<OverlayLoaderProps> = ({ text }) => {
  return (
    <div className={`${styles.overlay} d-flex align-items-center justify-content-center`}>
      <div className={styles.loaderBox}>
        <LoaderIcon className="logoStroke" />
        <p className={styles.loadingText}>Loading...</p>
        {text != null && (
          <div
            className={`${styles.text} d-flex align-items-center justify-content-between`}
          >
            <p>[</p>
            <p>{text}%</p>
            <p>]</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OverlayLoader;
