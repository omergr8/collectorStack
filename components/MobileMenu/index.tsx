// components/MobileMenu.tsx
"use client";
import React, { useEffect, useState, ReactNode } from "react";
import Link from "next/link";
import styles from "./MobileMenu.module.css";
import RedDownArrow from "@/public/icons/arrowDown.svg";
import { links } from "@/constants/constants";
import Toggle from "../Navbar/Toggle";
import Profile from "../Navbar/Profile";
import { useAuth } from "@/hooks";

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
interface WrapperProps {
  children: ReactNode;
  href?: string;
  className?: string;
  onClick?: () => void;
  [key: string]: any; // For any additional props
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, setIsOpen }) => {
  const { isAuthenticated } = useAuth();
  const [activeItem, setActiveItem] = useState<number>(0);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // Disable scrolling on the body when the sidebar is open
    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "auto";
    }

    // Clean up by resetting the overflow when the component unmounts
    return () => {
      document.documentElement.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      {/* Sidebar */}
      <div className={`${styles.sidebar} ${isOpen ? styles.showSidebar : ""}`}>
        <div className="gradient-container">
          <div className="gradient-image"></div>
        </div>
        <div className={styles.sidebarContent}>
          {isAuthenticated && (
            <div className={styles.profileBox}>
              <Profile isMenu={true} />
            </div>
          )}
          <div className={styles.menu}>
            <p className={styles.heading}>MENU</p>
            <div className="d-flex flex-column gap-2">
              {links.map((link, i) => {
                const IconComponent = link.icon;
                const Wrapper = ({
                  children,
                  href,
                  ...props
                }: WrapperProps) => {
                  return href ? (
                    <Link href={href} {...props}>
                      {children}
                    </Link>
                  ) : (
                    <div {...props}>{children}</div>
                  );
                };
                return (
                  <Wrapper
                    key={i}
                    href={link.to}
                    className={`${styles.linkBox} ${
                      i === activeItem && styles.activeItem
                    } d-flex align-items-center customLink`}
                    onClick={() => setActiveItem(i)}
                  >
                    <IconComponent
                      className={`linkLogo ${i === activeItem && "fill-white"}`}
                    />
                    <span
                      className={`customLink ${styles.linkText} ${
                        i === activeItem ? styles.activeLinkText : ""
                      }`}
                    >
                      {link.name}
                    </span>
                    {link.subLinks && (
                      <div className="ms-auto">
                        <RedDownArrow
                          className={`${i === activeItem ? "logo" : "redIcon"}`}
                        />
                      </div>
                    )}
                  </Wrapper>
                );
              })}
            </div>
          </div>
        </div>
        <div className={styles.footer}>
          <div className={styles.footerBox}>
            <Toggle isMenu={true} />
          </div>
        </div>
      </div>

      {/* Background overlay */}
      {isOpen && <div className={styles.overlay} onClick={toggleMenu}></div>}
    </>
  );
};

export default MobileMenu;
