import React from "react";
import styles from "./Checkbox.module.css";
import { CheckboxProps } from "@/constants/types";

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  id = "1",
}) => {
  const handleChange = () => {
    onChange(!checked);
  };

  return (
    <div className="d-flex align-items-center">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={handleChange}
        className={styles.checkbox}
      />
      <label htmlFor="customCheckbox" className={styles.label}>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
