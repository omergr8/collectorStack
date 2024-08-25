import React from "react";
import styles from './CustomToast.module.css'

interface CustomToastProps {
  heading: string;
  text: string;
}

const CustomToast: React.FC<CustomToastProps> = ({ heading, text }) => (
  <div>
    <strong className={styles.heading}>{heading}</strong>
    <p  className={styles.text}>{text}</p>
  </div>
);

export default CustomToast;
