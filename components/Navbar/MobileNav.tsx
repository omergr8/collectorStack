import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import Logo from "@/public/icons/mobileLogo.svg";
import Bell from "@/public/icons/bell.svg";
import Ham from "@/public/icons/ham.svg";
import Cross from "@/public/icons/cross.svg";
import Image from "next/image";
import { useIsMobile } from "@/hooks";

import MobileMenu from "../MobileMenu";

export default function MobileNav() {
  const isMobile = useIsMobile();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMobile) {
      setIsMobileMenuOpen(false);
    }
  }, [isMobile]);

  const handleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <>
      <MobileMenu setIsOpen={setIsMobileMenuOpen} isOpen={isMobileMenuOpen} />
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
            onClick={handleMobileMenu}
          >
            {isMobileMenuOpen ? <Cross /> : <Ham />}
          </div>
        </div>
      </div>
    </>
  );
}
