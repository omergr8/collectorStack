import React, { useEffect, useRef, useState } from "react";
import styles from "./Filter.module.css";
import Arrow from "@/public/icons/redDownArrow.svg";
import { FilterProps, FilterType } from "@/constants/types";
import Checkbox from "../CheckBox";

const Filter: React.FC<FilterProps> = ({
  filters,
  filterStates,
  setFilterStates,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null); // Ref for the search input
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleIconTextClick = (filterName: string) => {
    setActiveFilter(activeFilter === filterName ? null : filterName);
    setSearchQuery(""); // Reset the search query when a new dropdown is opened
  };

  const handleCheckboxChange = (
    filterName: string,
    value: string | number,
    checked: boolean
  ) => {
    setFilterStates((prevStates) => {
      const existingFilter = prevStates.find(
        (state) => state.filterName === filterName
      );

      if (existingFilter) {
        // Update the existing filter state
        const updatedValues = checked
          ? [...existingFilter.values, value]
          : existingFilter.values.filter((v) => v !== value);

        return prevStates.map((state) =>
          state.filterName === filterName
            ? { ...state, values: updatedValues }
            : state
        );
      } else {
        // Add a new filter state
        return [...prevStates, { filterName, values: [value] }];
      }
    });
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setActiveFilter(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Focus the search input when the dropdown is activated
  useEffect(() => {
    if (activeFilter && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [activeFilter]);

  // Function to sort the year filter values in descending order
  const getSortedValues = (filter: FilterType) => {
    if (filter.name === "year") {
      // Sort years in descending order (latest years first)
      return [...filter.values].sort(
        (a, b) => Number(b.value) - Number(a.value)
      );
    }
    return filter.values;
  };

  // Function to filter options based on the search query
  const getFilteredValues = (filter: FilterType) => {
    const sortedValues = getSortedValues(filter);
    if (searchQuery) {
      return sortedValues.filter((el) =>
        el.label.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return sortedValues;
  };

  return (
    <div
      className={`${styles.filterContainer} d-flex align-items-center`}
      ref={dropdownRef}
    >
      {filters.map((filter, index) => (
        <div
          key={index}
          className={`${styles.filterItem} d-flex align-items-center position-relative`}
        >
          <div
            className={`${styles.iconText} d-flex align-items-center cursor-pointer`}
            onClick={() => handleIconTextClick(filter.name)}
          >
            <span>{filter.label}</span>
            <Arrow />
          </div>
          {activeFilter === filter.name && (
            <div className={styles.dropdown}>
              {/* Search Field */}
              <input
                type="text"
                className={styles.searchInput}
                placeholder={`Search ${filter.label}`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                ref={searchInputRef} // Attach the ref to the search input
              />
              {/* Filtered Dropdown Values */}
              {getFilteredValues(filter).map((el) => (
                <div className={styles.dropdownContent} key={el.value}>
                  <Checkbox
                    checked={
                      filterStates
                        .find((state) => state.filterName === filter.name)
                        ?.values.includes(el.value) || false
                    }
                    onChange={(checked: boolean) =>
                      handleCheckboxChange(filter.name, el.value, checked)
                    }
                    label={el.label}
                  />
                </div>
              ))}
            </div>
          )}
          {index < filters.length - 1 && (
            <div className={styles.verticalLine} />
          )}
        </div>
      ))}
    </div>
  );
};

export default Filter;
