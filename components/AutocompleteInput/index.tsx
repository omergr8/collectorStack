import React, { useState, useEffect, useCallback, useRef } from "react";
import { debounce } from "lodash";
import styles from "./AutocompleteInput.module.css";
import Elippses from "@/public/icons/customCross.svg";
import { AutocompleteInputProps,Option } from "@/constants/types";


const AutocompleteInput: React.FC<AutocompleteInputProps> = ({
  label,
  placeholder,
  onChange,
  fetchOptions,
  lineColor = "green",
  error,
  type = "text",
  required = false,
  value,
}) => {
  const [inputValue, setInputValue] = useState<string>(value || "");
  const [options, setOptions] = useState<Option[]>([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const debouncedFetchOptions = useCallback(
    debounce(async (query: string) => {
      setLoading(true);
      try {
        const results = await fetchOptions(query);
        setOptions(results || []); // Ensure options is always an array
      } catch (error) {
        console.error("Error fetching options:", error);
        setOptions([]);
      } finally {
        setLoading(false);
      }
    }, 300),
    [fetchOptions]
  );

  useEffect(() => {
    if (inputValue && isDropdownVisible) {
      debouncedFetchOptions(inputValue);
    } else {
      setOptions([]);
    }
  }, [inputValue, debouncedFetchOptions, isDropdownVisible]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setIsDropdownVisible(true);
  };

  const handleOptionSelect = (option: Option) => {
    setInputValue(option.value);
    onChange(option.value);
    setIsDropdownVisible(false);
  };

  const handleDeselect = () => {
    setInputValue("");
    onChange("");
    setIsDropdownVisible(false);
  };

  const handleDropdownClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node) &&
      inputRef.current &&
      !inputRef.current.contains(e.target as Node)
    ) {
      if (!options.some(option => option.value === inputValue)) {
        handleDeselect(); // Clear input if no option is selected
      }
      setIsDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [options, inputValue]);

  return (
    <div className={`${styles.inputContainer} position-relative w-100`}>
      <label className={styles.inputLabel} htmlFor={label}>
        {label} {required && <span className="required">*</span>}
      </label>
      <div className={`d-flex align-items-center h-100 position-relative`}>
        <div className={error ? styles.redLine : styles.greenLine}></div>
        <input
          ref={inputRef}
          id={label}
          type={type}
          className={`${styles.inputBox} ${error ? styles.errorInputBox : ""} h-100 w-100`}
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onClick={() => setIsDropdownVisible(true)}
        />
        {inputValue && (
          <div className={styles.errorIcon} onClick={handleDeselect}>
            <Elippses className="logoStroke"/>
          </div>
        )}
      </div>
      {isDropdownVisible && (
        <div
          ref={dropdownRef}
          className={styles.dropdown}
          onClick={handleDropdownClick}
        >
          {loading ? (
            <div className={styles.loading}>Loading...</div>
          ) : options.length > 0 ? (
            options.map((option, i) => (
              <div
                key={i}
                onClick={() => handleOptionSelect(option)}
                className={styles.dropdownItem}
              >
                {option.label}
              </div>
            ))
          ) : (
            <div
              onClick={() =>
                handleOptionSelect({
                  label: `Add "${inputValue}"`,
                  value: inputValue,
                })
              }
              className={styles.dropdownItem}
            >
              Add &quot;{inputValue}&quot;
            </div>
          )}
        </div>
      )}
      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  );
};

export default AutocompleteInput;
