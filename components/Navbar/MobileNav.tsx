import React from "react";
import styles from "./Navbar.module.css";
import Logo from "@/public/icons/mobileLogo.svg";
import Bell from "@/public/icons/bell.svg";
import Ham from "@/public/icons/ham.svg";
import Image from "next/image";

export default function MobileNav() {
  return (
    <div
      className={`${styles.main} d-flex align-items-center justify-content-between w-100`}
    >
      <div className="d-flex align-items-center gap-2">
        <div
          className={`${styles.mobileProfile} overflow-hidden d-flex align-items-center justify-content-center`}
        >
          <Image
            src="/images/avatar.jpg"
            height={20}
            width={20}
            alt="Profile"
          />
        </div>
        <div className="iconHolder">
          <Bell className="logo" />
        </div>
      </div>
      <div className={styles.logo}>
        <Logo className="logo" />
      </div>
      <div className="d-flex align-items-center gap-2">
        <div className="iconHolder">
          <Bell className="logo" />
        </div>
        <div
          className={`${styles.mobileHam} d-flex align-items-center justify-content-center cursor-pointer`}
        >
          <Ham />
        </div>
      </div>
    </div>
  );
}
