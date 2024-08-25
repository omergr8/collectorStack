import React, { useState, useRef, useEffect } from "react";
import styles from "./CustomSortComponent.module.css";
import Arrow from "@/public/icons/redDownArrow.svg";

interface CustomSortComponentProps {
  options: { label: string; value: string }[];
  selectedOption: string;
  onChange: (value: string) => void;
}

const CustomSortComponent: React.FC<CustomSortComponentProps> = ({
  options,
  selectedOption,
  onChange,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isDropdown, setIsDropdown] = useState<boolean>(false);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDropdown = () => {
    setIsDropdown(true);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setIsDropdown(false);
    }
  };

  const handleChange = (value: string) => {
    setIsDropdown(false);
    onChange(value);
  };
  function findLabelByValue(value: string) {
    const option = options.find((option) => option.value === value);
    return option ? option.label : undefined; // Returns undefined if the value is not found
  }

  return (
    <div className={styles.sortContainer}>
      <div className={`${styles.sortBy} d-flex align-items-center cursor-pointer`} onClick={handleDropdown}>
        <p className="m-0">Sort by ({findLabelByValue(selectedOption)})</p>
        <Arrow />
      </div>
      {isDropdown && (
        <div className={`${styles.dropdown}`} ref={dropdownRef}>
          {options.map((option, i) => (
            <div key={option.value}>
              <p
                onClick={() => handleChange(option.value)}
                className={`${styles.sortText} m-0 cursor-pointer`}
              >
                {option.label}
              </p>
              {i < options.length - 1 && <hr className={styles.separator} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSortComponent;
