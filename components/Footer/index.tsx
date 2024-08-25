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
    <footer className={`py-4 mx-md-3 mx-0 rounded-top-4 ${styles.main}`}>
      <div className="container-95">
        {/* First Row: Logo and Icons */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="d-none d-md-flex align-items-center">
            <Logo className="logo" />
          </div>
          <div className="d-flex d-md-none align-items-center">
            <MobileLogo className="logo" />
          </div>
          <div className="d-flex align-items-center gap-1">
            <div className="iconHolder">
              <Facebook className="logo" />
            </div>
            <div className="iconHolder">
              <Insta className="logo" />
            </div>
            <div className="iconHolder">
              <Twitter className="logo" />
            </div>
          </div>
        </div>

        {/* Horizontal Line */}
        <hr className="dotted-line m-0" />

        {/* Second Row: Heading, Paragraph, and Logos */}
        <div className="row align-items-center">
          <div className="col-md-6 d-flex align-items-center">
            <div>
              <h5 className={`mb-2 ${styles.fontLarge}`}>Collector Stack</h5>
              <p className={`mb-4 ${styles.fontSmall}`}>
                Manage, Share and Discover the Value of Your Most Valuable
                Sports Cards
              </p>
            </div>
          </div>
          <div className="col-md-6 d-flex justify-content-start  justify-content-md-end">
            <div className="d-flex flex-column flex-md-row  flex-wrap gap-4 ">
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
        <hr className="dotted-line" />

        {/* Third Row: Footer Text and Links */}
        <div className="row">
          <div className="col-md-6 text-md-start text-center mb-4 mb-md-0 ">
            <p className={`mb-0 ${styles.fontSmall}`}>
              @ 2024 Collector Stack. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 d-flex justify-content-md-end justify-content-center">
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
