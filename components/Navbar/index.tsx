"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks";
import { routes } from "@/config/routes";

import LinksBar from "./LinksBar";
import Toggle from "./Toggle";
import Profile from "./Profile";
import MobileNav from "./MobileNav";
import IconBar from "./IconBar";
import Button from "../Button";

import Logo from "@/public/icons/logo.svg";

import styles from "./Navbar.module.css";

export default function Navbar() {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push(routes.account.login);
  };
  const { isAuthenticated } = useAuth();
  return (
    <div className="container-95">
      <div className="d-lg-none">
        <MobileNav />
      </div>
      <div
        className={`${styles.main} d-flex align-items-center justify-content-between w-100 d-none d-lg-flex`}
      >
        <div
          className="cursor-pointer"
          onClick={() => router.push(routes.home)}
        >
          <Logo className="logo" />
        </div>
        <div className={styles.linksBar}>
          <LinksBar />
        </div>
        <div className={styles.toggle}>
          <Toggle />
        </div>
        {isAuthenticated ? (
          <>
            <IconBar />
            <div className={styles.profile}>
              <Profile />
            </div>
          </>
        ) : (
          <Button
            customClass="white-text-force"
            borderRadius="555px"
            paddingX="30px"
            onClick={handleLoginClick}
          >
            Login
          </Button>
        )}
      </div>
    </div>
  );
}
