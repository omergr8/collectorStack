"use client";
import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import styles from "./Navbar.module.css";
import { toggleMode } from "@/constants/constants";

export default function Toggle() {
  const [toggle, setToggle] = useState<string>("dark");
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      setToggle(theme === "system" ? "dark" : theme || "dark");
    }
  }, [theme, mounted]);

  if (!mounted) {
    return null;
  }

  const onToggle = () => {
    const newTheme = toggle === "dark" ? "light" : "dark";
    setToggle(newTheme);
    setTheme(newTheme);
  };

  const currentMode = toggleMode.find((mode) => mode.name === toggle);

  return (
    <div>
      <div
        className={`${styles.toggleBox} d-flex align-items-center justify-content-center`}
      >
        {/* For mobile view, show only the current mode's icon */}
        <div
          className={`${styles.mobileToggle} ${
            toggle === currentMode?.name && styles.activeToggle
          }`}
          onClick={onToggle}
        >
          {currentMode && <currentMode.icon style={{ fill: "white" }} />}
        </div>

        {/* For desktop view, show both icons */}
        <div className={styles.desktopToggle}>
          {toggleMode.map((mode, i) => {
            const IconComponent = mode.icon;
            return (
              <div
                key={i}
                className={`${toggle === mode.name && styles.activeToggle} ${
                  styles.toggleItem
                } d-flex align-items-center justify-content-center cursor-pointer`}
                onClick={() => onToggle()}
              >
                <IconComponent
                  className={`${toggle === mode.name ? 'fill-white' : "toggleIcon"}`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
