"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { links } from "@/constants/constants";
import RedDownArrow from "@/public/icons/redDownArrow.svg";
import MenuDropdown from "../MenuDropdown";

export default function LinksBar() {
  const [activeItem, setActiveItem] = useState<number>(0);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveItem(0);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`${styles.linkBox} d-flex align-items-center gap-4`}>
      {links.map((link, i) => {
        const IconComponent = link.icon;
        return (
          <div
            key={i}
            className={`${styles.linkItem} ${
              i === activeItem && styles.activeItem
            } d-flex align-items-center cursor-pointer`}
            onClick={() => setActiveItem(i)}
            ref={i === activeItem && link.subLinks ? dropdownRef : null}
          >
            <div>
              <IconComponent
                className={`linkLogo ${i === activeItem && "fill-white"}`}
              />
            </div>
            {link.to ? (
              <Link
                href={link.to}
                className={`customLink ${styles.linkText} ${
                  i !== activeItem ? styles.hideText : ""
                }`}
              >
                {link.name}
              </Link>
            ) : (
              <p
                className={`${styles.linkText} ${
                  i !== activeItem ? styles.hideText : ""
                }`}
              >
                {link.name}
              </p>
            )}

            <div className="position-relative">
              <div className={styles.badge}>{link.name}</div>
            </div>
            {link.subLinks && <RedDownArrow />}
            {link.subLinks && i === activeItem && (
              <div className={styles.subLinksBox}>
                <MenuDropdown subLinks={link.subLinks} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
