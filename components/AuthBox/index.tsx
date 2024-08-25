import React from "react";
import styles from "./AuthBox.module.css";
import Logo from "@/public/icons/largeLogo.svg";
import { AuthBoxProps } from "@/constants/types";

export default function AuthBox({ children }: AuthBoxProps) {
  return (
    <div className={styles.main}>
      <div className={styles.box}>
        <div className="container-95">
          <div className={`${styles.icon} d-none d-md-flex`}>
            <Logo className="logo" />
          </div>
          <div className={styles.innerBox}>
            <div className="container-95">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
