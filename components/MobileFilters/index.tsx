// components/MobileMenu.tsx
"use client";
import React, { useEffect, useState } from "react";

import styles from "./MobileFilters.module.css";

import CrossIcon from "@/public/icons/cross.svg";
import BackIcon from "@/public/icons/back.svg";

import Button from "../Button";
import CustomInput from "../CustomInput";
import Checkbox from "../CheckBox";
import ReactSelect from "../ReactSelect";

import { useAuth } from "@/hooks";

import { sortOptions } from "@/constants/constants";
import { FilterType } from "@/constants/types";

interface MobileFiltersProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  filters: FilterType[];
  filterStates: Array<{ filterName: string; values: (string | number)[] }>;
  setFilterStates: React.Dispatch<
    React.SetStateAction<
      Array<{ filterName: string; values: (string | number)[] }>
    >
  >;
  handleSearch: (val: string) => void;
  setOrder: (order: string) => void;
  ordering: string;
}

const MobileFilters: React.FC<MobileFiltersProps> = ({
  isOpen,
  setIsOpen,
  filters,
  filterStates,
  setFilterStates,
  handleSearch,
  ordering,
  setOrder,
}) => {
  const { isAuthenticated } = useAuth();
  const [activeItem, setActiveItem] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState<any>(() => {
    const matchedOption = sortOptions.find(
      (option) => option.value === ordering
    );
    return matchedOption || { label: "Latest Added", value: "-created_date" };
  });
  const [selectedFilter, setSelectedFilter] = useState<any>();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const handleSortChange = (e: any) => {
    setSortOption(e);
    setOrder(e.value);
  };
  useEffect(() => {
    // Disable scrolling on the body when the sidebar is open
    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "auto";
    }

    // Clean up by resetting the overflow when the component unmounts
    return () => {
      document.documentElement.style.overflow = "auto";
    };
  }, [isOpen]);

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
    // if (searchQuery) {
    //   return sortedValues.filter((el) =>
    //     el.label.toLowerCase().includes(searchQuery.toLowerCase())
    //   );
    // }
    return sortedValues;
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

  return (
    <>
      {/* Sidebar */}
      <div className={`${styles.sidebar} ${isOpen ? styles.showSidebar : ""}`}>
        <div className={styles.sidebarContent}>
          <div
            className={`${styles.header} d-flex align-items-center justify-content-between`}
          >
            {selectedFilter ? (
              <div
                className={`d-flex align-items-center justify-content-center ${styles.back}`}
                onClick={() => setSelectedFilter(undefined)}
              >
                <BackIcon className="logo" />
                <p>Back</p>
              </div>
            ) : (
              <p className={styles.headerText}>Filters</p>
            )}

            <CrossIcon
              onClick={() => setIsOpen(false)}
              className="cursor-pointer"
            />
          </div>
          {!selectedFilter && (
            <div className={styles.searchInput}>
              <CustomInput
                label="Search"
                placeholder="Search cards..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          )}
          <div className={styles.filterBox}>
            {filters.map((filter, index) => (
              <div key={index}>
                {!selectedFilter && (
                  <div
                    className={styles.filter}
                    onClick={() => setSelectedFilter(filter)}
                  >
                    <p>{filter.label}</p>
                    <hr className="dotted-line m-0" />
                  </div>
                )}
              </div>
            ))}
          </div>
          {selectedFilter && (
            <div className={styles.selectedBox}>
              <h2 className={styles.selectedHeading}>{selectedFilter.label}</h2>
              <div className={styles.filterCheckbox}>
                {getFilteredValues(selectedFilter)?.map((el) => (
                  <div className={styles.dropdownContent} key={el.value}>
                    <Checkbox
                      checked={
                        filterStates
                          .find(
                            (state) => state.filterName === selectedFilter.name
                          )
                          ?.values.includes(el.value) || false
                      }
                      onChange={(checked: boolean) =>
                        handleCheckboxChange(
                          selectedFilter.name,
                          el.value,
                          checked
                        )
                      }
                      label={el.label}
                    />
                    <hr className={`dotted-line ${styles.checkboxSepartor}`} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className={styles.footer}>
          <div className={`${styles.footerBox} d-flex flex-column gap-2`}>
            <div className="d-flex justify-content-center">
              {!selectedFilter && (
                <ReactSelect
                  label="Sort"
                  value={sortOption}
                  onChange={handleSortChange}
                  options={sortOptions}
                  maxHeight={130}
                />
              )}
            </div>
            {!selectedFilter && (
              <Button
                customClass="white-text-force m-auto"
                onClick={() => handleSearch(searchTerm)}
              >
                Search
              </Button>
            )}
            {/* {selectedFilter ? (
              <Button
                customClass="white-text-force m-auto"
                onClick={handleApply}
              >
                Apply
              </Button>
            ) : (
              <Button
                customClass="white-text-force m-auto"
                onClick={handleSearch}
              >
                Search
              </Button>
            )} */}
          </div>
        </div>
      </div>

      {/* Background overlay */}
      {isOpen && <div className={styles.overlay} onClick={toggleMenu}></div>}
    </>
  );
};

export default MobileFilters;
