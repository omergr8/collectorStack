// components/SelectBox.tsx
import React, { useState } from "react";
import Select from "react-select";
import { SelectBoxProps } from "@/constants/types";
import styles from "./ReactSelect.module.css";
import ArrowDownIcon from "@/public/icons/arrowDown.svg"; // Import your arrow icon

const ReactSelect: React.FC<SelectBoxProps> = ({
  label,
  value,
  onChange,
  options,
  lineColor = "green",
  error,
  required = false,
  maxHeight,
}) => {
  const customStyles = {
    container: (provided: any) => ({
      ...provided,
      width: "100%",
    }),
    control: (provided: any, state: any) => ({
      ...provided,
      border: "none",
      borderRadius: "8px",
      boxShadow: state.isFocused ? "0 0 5px rgba(0, 123, 255, 0.3)" : "none",
      padding: "0 10px",
      backgroundColor: error
        ? "rgba(211, 13, 68, 0.15)"
        : `rgba(255, 255, 255, var(--input-opacity))`,
      height: "100%",
      minHeight: "65px",
      position: "relative",
      paddingRight: "40px", // Space for the arrow icon
      cursor: "pointer",
    }),
    menu: (provided: any) => ({
      ...provided,
      marginTop: "0px", // Adjust if needed
      zIndex: 99,
    }),
    menuList: (provided: any) => ({
      ...provided,
      // kill the white space on first and last option
      //   padding: 0,
      backgroundColor: "rgba(53,53,53)",
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "rgba(255,255,255,0.1)"
        : "transparent",
      color: state.isSelected ? "#fff" : "#fff",
      cursor: "pointer",
    }),
    placeholder: (provided: any) => ({
      ...provided,
      fontSize: "16px",
      padding: "30px 10px 10px 17px",
    }),
    singleValue: (provided: any) => ({
      ...provided,
      fontSize: "16px",
      padding: "30px 10px 10px 17px",
      color: `var(--foreground)`,
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided,
      padding: "0",
      color: "#ccc", // Adjust color if needed
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    input: (provided: any) => ({
      ...provided,
      padding: "30px 10px 10px 17px",
      color: `var(--foreground)`,
      margin: 0,
    }),
    valueContainer: (provided: any) => ({
      ...provided,
      padding: 0, // Remove padding from value container (where placeholder and selected value are shown)
    }),
  };
  const [selectedOption, setSelectedOption] = useState<any>(value);

  const handleChange = (selected: any) => {
    setSelectedOption(selected);
    onChange(selected);
  };

  return (
    <div className={`${styles.inputContainer} position-relative w-100`}>
      <label className={styles.inputLabel} htmlFor={label}>
        {label} {required && <span className="required">*</span>}
      </label>
      <div className="d-flex align-items-center h-100 position-relative">
        <div className={error ? styles.redLine : styles.greenLine}></div>
        <div className={styles.selectBoxWrapper}>
          <Select
            id={label}
            value={selectedOption}
            onChange={handleChange}
            options={options}
            placeholder={label}
            styles={customStyles}
            components={{ IndicatorSeparator: () => null }} // Removes the default separator
            maxMenuHeight={maxHeight || undefined}
          />
        </div>
      </div>
      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  );
};

export default ReactSelect;
