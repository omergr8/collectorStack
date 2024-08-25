import React from "react";
import styles from "./MenuDropdown.module.css";
import Arrow from "@/public/icons/arrow.svg";
import { MenuDropdownProps } from "@/constants/types";

const MenuDropdown: React.FC<MenuDropdownProps> = ({ subLinks }) => {
  return (
    <div className={`${styles.dropdownContainer} d-flex flex-wrap`}>
      {subLinks.map((category, index) => (
        <div key={index} className={styles.subLinkCategory}>
          <div className={styles.separator} />
          <h3 className={styles.heading}>{category.title}</h3>
          {category.links.map((link, idx) => (
            <div
              key={idx}
              className={`${styles.linkBox} d-flex align-items-center cursor-pointer`}
            >
              <Arrow />
              <p className={`${styles.link} d-flex align-items-center m-0`}>
                {link.name}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MenuDropdown;
