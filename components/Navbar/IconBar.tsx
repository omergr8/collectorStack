import React from 'react';
import Shopping from "@/public/icons/shopping.svg";
import Bell from "@/public/icons/bell.svg";
import styles from "./Navbar.module.css";

const IconBar = () => {
  return (
    <div className='d-flex align-items-center gap-2'>
      {/* <div className="iconHolder">
        <Shopping className="logo" />
      </div> */}
      <div className="iconHolder">
        <Bell className="logo" />
      </div>
    </div>
  );
};

export default IconBar;
