import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { debounce } from "lodash";

import { SearchBoxProps, CardResult } from "@/constants/types";

import SearchIcon from "@/public/icons/search.svg";
import Cross from "@/public/icons/cross.svg";

import styles from "./SearchBox.module.css";

const SearchBox: React.FC<SearchBoxProps> = ({
  onSearch,
  selectedData,
  setSelectedData,
  error,
}) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<CardResult[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const fetchResults = useCallback(
    async (searchQuery: string) => {
      if (searchQuery.trim() === "") {
        setResults([]);
        setShowDropdown(false);
        return;
      }

      try {
        const searchResults = await onSearch(searchQuery);
        console.log("test", searchResults);
        setResults(searchResults);
        setShowDropdown(true);
      } catch (error) {
        console.error("Error fetching results:", error);
        setResults([]);
        setShowDropdown(false);
      }
    },
    [onSearch]
  );

  // Debounce the fetchResults function
  const debouncedFetchResults = useCallback(debounce(fetchResults, 500), [
    fetchResults,
  ]);

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      setShowDropdown(false);
    }
  }, [query]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedFetchResults(value);
  };

  const handleSelectResult = (result: CardResult) => {
    setSelectedData(result);
    setShowDropdown(false);
    setQuery(""); // Clear the input field
  };

  const handleClearSelection = () => {
    setSelectedData(undefined);
    setQuery(""); // Clear the input field
  };
  console.log(selectedData);
  return (
    <div className={`${styles.searchContainer} position-relative w-100`}>
      <div
        className={`${styles.searchBox} d-flex align-items-center position-relative`}
      >
        <div
          className={`${styles.searchIcon} d-flex align-items-center justify-content-center`}
        >
          <SearchIcon />
        </div>

        <input
          type="text"
          value={
            selectedData
              ? `${selectedData.title} (${selectedData.number})`
              : query
          }
          onChange={handleInputChange}
          className={styles.searchInput}
          placeholder="Search Card"
          disabled={!!selectedData?.id} // Disable input if an item is selected
        />
        {selectedData?.id && (
          <div
            className={`${styles.selectedItem} d-flex align-items-center justify-content-center cursor-pointer`}
            onClick={handleClearSelection}
          >
            <Cross />
          </div>
        )}
      </div>
      {error && <p className={styles.errorText}>{error}</p>}
      {showDropdown && results && (
        <div className={styles.dropdown}>
          {results.map((result, index) => (
            <div
              key={index}
              className={`${styles.resultRow} d-flex align-items-center cursor-pointer`}
              onClick={() => handleSelectResult(result)}
            >
              <Image
                src={result.front_image || "/default-image.png"} // Fallback image if front_image is null
                alt="Result"
                width={40}
                height={40}
                className={styles.resultImage}
              />
              <p className={styles.resultText}>
                {result.player_detail.name || "Unknown Player"}
              </p>
              <p className={styles.resultText}>
                {result.player_detail.sportstype || "Unknown Sport"}
              </p>
              <p className={styles.resultText}>{result.number || "N/A"}</p>
              <p className={styles.resultText}>{result.title || "Untitled"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBox;
