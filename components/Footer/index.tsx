import React from "react";
import Link from "next/link";
import { links } from "@/constants/constants";
import styles from "./Footer.module.css";
import Logo from "@/public/icons/logo.svg";
import MobileLogo from "@/public/icons/mobileLogo.svg";
import Facebook from "@/public/icons/facebook.svg";
import Insta from "@/public/icons/instagram.svg";
import Twitter from "@/public/icons/twitter.svg";

export default function Footer() {
  return (
    <footer className={`mx-md-3 mx-0 ${styles.main}`}>
      <div>
        {/* First Row: Logo and Icons */}
        <div
          className={`d-flex justify-content-between align-items-center ${styles.topSection}`}
        >
          <div className="d-none d-md-flex align-items-center">
            <Logo className="logo" />
          </div>
          <div className="d-flex d-md-none align-items-center">
            <MobileLogo className="logo" />
          </div>
          <div className="d-flex align-items-center gap-1">
            <div className={styles.iconBox}>
              <Facebook className="logo" />
            </div>
            <div className={styles.iconBox}>
              <Insta className="logo" />
            </div>
            <div className={styles.iconBox}>
              <Twitter className="logo" />
            </div>
          </div>
        </div>

        {/* Horizontal Line */}
        <hr className="dotted-line m-0" />

        {/* Second Row: Heading, Paragraph, and Logos */}
        <div className={`row align-items-center ${styles.midSection}`}>
          <div className="col-md-6 d-flex align-items-center">
            <div className={styles.midSectionText}>
              <h5 className={`mb-2 ${styles.fontLarge}`}>Collector Stack</h5>
              <p className={`m-0 ${styles.fontSmall}`}>
                Manage, Share and Discover the Value of Your Most Valuable
                Sports Cards
              </p>
            </div>
          </div>
          <div className="col-md-6 d-flex justify-content-start  justify-content-md-end">
            <div className="d-flex flex-column flex-md-row  flex-wrap gap-1 gap-md-4 ">
              {links.map((link, i) => {
                const IconComponent = link.icon;
                return (
                  <div
                    key={i}
                    className="d-flex align-items-center gap-2 me-3 mb-2"
                  >
                    <div className="footerIconHolder">
                      <IconComponent className="logo" />
                    </div>
                    <span className={`${styles.fontSmall}`}>{link.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Horizontal Line */}
        <hr className="dotted-line m-0 d-none d-md-block" />

        {/* Third Row: Footer Text and Links */}
        <div className={`row ${styles.lastSection}`}>
          <div className="col-md-6 text-md-start text-center ">
            <p className={`mb-0 ${styles.fontSmall}`}>
              @ 2024 Collector Stack. All rights reserved.
            </p>
          </div>
          <div className={`col-md-6 d-flex justify-content-md-end justify-content-center ${styles.bottomLinks}`}>
            <Link href="/terms" className="mx-2 footerLink" passHref>
              <span className={`${styles.fontSmall}`}>Terms Policy</span>
            </Link>
            <Link href="/cookies" className="mx-2 footerLink" passHref>
              <span className={`${styles.fontSmall}`}>Cookies</span>
            </Link>
            <Link href="/privacy" className="mx-2 footerLink" passHref>
              <span className={`${styles.fontSmall}`}>Privacy</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
