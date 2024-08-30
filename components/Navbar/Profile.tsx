import React, { useState, useRef, useEffect } from "react";
import styles from "./Navbar.module.css";
import Image from "next/image";
import Button from "../Button";
import DotIcon from "@/public/icons/threeDots.svg";
import { useAuth } from "@/hooks";
import { profileLinks } from "@/constants/constants";

interface ProfileProps {
  isMenu?: boolean;
}

const Profile = ({ isMenu = false }: ProfileProps) => {
  const { user, logout } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isDropdown, setIsDropdown] = useState<boolean>(false);
  // Fallback user name if `user` is not available
  const userName = user ? `${user.first_name} ${user.last_name}` : "Guest";

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDropdown = () => {
    setIsDropdown((prevState) => !prevState);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setIsDropdown(false);
    }
  };

  return (
    <div
      className={`${styles.profileBox} ${
        isMenu && styles.menuProfileBox
      }  d-flex align-items-center position-relative ${
        isMenu && "w-100 justify-content-between"
      }`}
    >
      <div className="d-flex align-items-center gap-3">
        <div
          className={`${styles.profileImage} ${
            isMenu && styles.menuProfileImage
          } overflow-hidden d-flex align-items-center justify-content-center`}
        >
          <Image
            src="/images/avatar.jpg"
            className={`${isMenu && styles.menuProfileImage}`}
            height={50}
            width={50}
            alt="Profile"
            // Add placeholder to ensure proper rendering if image takes time
            placeholder="blur"
            blurDataURL="/images/avatar.jpg" // Optional: low-res image for placeholder
          />
        </div>
        <div
          className={`${!isMenu && styles.profileTextNav} ${
            styles.profileText
          }`}
        >
          <p className="mb-0">Welcome</p>
          <p className="mb-0">{userName}</p>
        </div>
      </div>
      <div ref={dropdownRef}>
        <div
          className={`${styles.profileIcon} cursor-pointer d-flex justify-content-center`}
          onClick={handleDropdown}
        >
          <DotIcon className="logo" />
        </div>
        {isDropdown && (
          <div className={styles.dropdown}>
            {profileLinks.map((el, i) => (
              <p
                key={el.name}
                className={`${styles.dropdownLink} cursor-pointer`}
              >
                {el.name}
              </p>
            ))}
            <Button
              onClick={logout}
              customClass="white-text-force w-100"
              paddingX="20px"
            >
              Log out
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
