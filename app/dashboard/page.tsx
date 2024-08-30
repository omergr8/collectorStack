"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import ReactPaginate from "react-paginate";
import { debounce } from "lodash";

import withAuth from "@/providers/AuthProvider/withAuth";
import { useAuth } from "@/hooks";

import { userCollectedCard } from "@/api/core/userCollectedCard";
import { fetchFilters } from "@/api/core/filters";
import {
  CollectedCardSummaryResponse,
  CollectedByCardSummaryResponse,
} from "@/constants/types";
import { getGradeDetails } from "@/constants/helper";

import Sidebar from "@/components/Sidebar";
import StatisticCard from "@/components/StatisticCard";
import ProgressCard from "@/components/ProgressCard";
import Filter from "@/components/Filter";
import Button from "@/components/Button";
import IconButton from "@/components/IconButton";
import Card from "@/components/Card";
import Collapsible from "@/components/Collapsible";
import CardLayout from "@/components/Layout/CardLayout";
import CommonLayout from "@/components/CommonLayout";
import Spinner from "@/components/Spinner";
import CustomSortComponent from "@/components/CustomSortComponent";
import SearchInput from "@/components/SearchInput";
import CategoryCards from "@/components/CategoryCards";
import PaginatedCards from "@/components/PaginatedCards";

import { dashText, sortOptions } from "@/constants/constants";
import { routes } from "@/config/routes";
import { transformFiltersToQueryParams } from "@/constants/helper";
import { useIsMobile } from "@/hooks";

import Copy from "@/public/icons/NumberCard.svg";
import Star from "@/public/icons/star.svg";
import Search from "@/public/icons/search.svg";
import MobileFilter from "@/public/icons/mobileFilter.svg";

import styles from "./dashboard.module.css";
import toaster from "@/components/Toast/Toast";
import MobileFilters from "@/components/MobileFilters";
// Define initial page size and state
const initialPageSize = 5;

const Dashboard = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const router = useRouter();
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const searchDropdownRef = useRef<HTMLDivElement | null>(null);
  const loadingCardsRef = useRef(false);
  const [isAll, setIsAll] = useState(false);
  const [isMobileFilter, setIsMobileFilter] = useState(false);
  const [filters, setFilters] = useState([]);
  const [filterStates, setFilterStates] = React.useState<
    Array<{ filterName: string; values: (string | number)[] }>
  >([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchDropdown, setSearchDropdown] = useState(false);
  const [collectedCards, setCollectedCards] = useState<any[]>([]);
  const [sortOption, setSortOption] = useState<string>("-created_date");
  const [orderBy, setOrderBy] = useState<string>("");
  const [pageNumber, setPageNumber] = useState(1);
  const [queryParams, setQueryParams] = useState({
    page: 1,
    page_size: initialPageSize,
    q: "",
    ordering: sortOption,
  });
  const queryParamsRef = useRef(queryParams);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [statistic, setStatistic] =
    useState<CollectedCardSummaryResponse | null>(null);
  const [progressData, setProgressData] =
    useState<CollectedByCardSummaryResponse | null>(null);
  const [loadingCards, setLoadingCards] = useState<boolean>(false);
  const [loadingStats, setLoadingStats] = useState<boolean>(false);
  const [loadingProgress, setLoadingProgress] = useState<boolean>(false);
  const [loadingFilters, setLoadingFilters] = useState<boolean>(false);
  const [errorOccurred, setErrorOccurred] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [searchFilterError, setSearchFilterError] = useState(false);

  const totalPages = 10;
  const itemsPerPage = 3;

  useEffect(() => {
    if (!isMobile) {
      setIsAll(false);
    }
  }, [isMobile]);

  const test = () => {};
  const onButtonClick = (filter: string) => {
    setIsAll(true);
  };

  const handleSeeMore = (orderBy: string) => {
    setOrderBy(orderBy);
  };

  const fetchCards = useCallback(async () => {
    if (!user?.username) return;
    if (loadingCardsRef.current) return; // Guard against multiple calls
    loadingCardsRef.current = true;
    setErrorOccurred(false);
    setLoadingCards(true);
    try {
      const response = await userCollectedCard(user.username).getAll({
        ...queryParamsRef.current,
        page_size: initialPageSize,
        page: 1,
      });
      setPageNumber(2);
      setTotalCount(response.count);
      setCollectedCards(response.results);
    } catch (error: any) {
      console.error("Error fetching cards:", error);
      let err = `${
        error.message
          ? error.message + ", check your network and try agan."
          : "Failed to fetch Collected Cards, check your network and try agan."
      }`;
      toaster.error(err);
    } finally {
      setLoadingCards(false);
      loadingCardsRef.current = false;
    }
  }, [user]);

  const loadMoreCards = useCallback(async () => {
    if (
      !user?.username ||
      loadingCardsRef.current ||
      collectedCards.length >= totalCount ||
      errorOccurred
    )
      return;
    loadingCardsRef.current = true;
    setLoadingCards(true);
    try {
      const response = await userCollectedCard(user.username).getAll({
        ...queryParamsRef.current,
        page_size: initialPageSize,
        page: pageNumber,
      });
      setPageNumber((prev) => prev + 1);
      setCollectedCards((prevCards) => [...prevCards, ...response.results]);
    } catch (error: any) {
      console.error("Error fetching more cards:", error, error?.message);
      let err = `${
        error.message
          ? error.message + ", check your network and try agan."
          : "Failed to fetch Collected Cards, check your network and try agan."
      }`;
      toaster.error(err);
      setErrorOccurred(true);
    } finally {
      setLoadingCards(false);
      loadingCardsRef.current = false;
    }
  }, [user, collectedCards, totalCount, pageNumber, errorOccurred]);

  const debouncedFetchCards = useCallback(
    debounce(() => {
      setCollectedCards([]);
      fetchCards();
    }, 600), // Adjust the debounce delay as needed
    [fetchCards]
  );

  const loadFilters = async () => {
    setLoadingFilters(true);
    try {
      const response = await fetchFilters();
      setFilters(response);
    } catch (error: any) {
      let err = `${
        error.message
          ? error.message + ", check your network and try agan."
          : "Failed to fetch Filters, check your network and try agan."
      }`;
      toaster.error(err);
      console.error("Error fetching filters:", error);
    } finally {
      setLoadingFilters(false);
    }
  };

  useEffect(() => {
    queryParamsRef.current = queryParams;
  }, [queryParams]);

  useEffect(() => {
    loadFilters();
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (orderBy !== "") {
      setIsAll(true);
    }
  }, [orderBy]);

  const handleClickOutside = (e: MouseEvent) => {
    if (
      searchDropdownRef.current &&
      !searchDropdownRef.current.contains(e.target as Node)
    ) {
      setSearchDropdown(false);
    }
  };

  const onAddcard = () => {
    router.push(routes.core.addCard);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loadingCardsRef.current) {
          loadMoreCards();
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loadMoreCards]);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  useEffect(() => {
    const loadCollectedCardsSummary = async () => {
      if (!user?.username) return;
      try {
        setLoadingStats(true); // Start loading state for statistics
        const statisticData = await userCollectedCard(
          user.username
        ).fetchCollectedCardSummary();
        setStatistic(statisticData);
      } catch (error: any) {
        let err = `${
          error.message
            ? error.message + ", check your network and try agan."
            : "Failed to fetch Statistics, check your network and try agan."
        }`;
        toaster.error(err);
        setError(error.message || "Failed to fetch statistics");
      } finally {
        setLoadingStats(false); // End loading state for statistics
      }
    };
    const loadCollectedByCardsSummary = async () => {
      if (!user?.username) return;
      try {
        setLoadingProgress(true);
        const progressDataResponse = await userCollectedCard(
          user.username
        ).getByCardSetSummary({});
        setProgressData(progressDataResponse);
      } catch (error: any) {
        let err = `${
          error.message
            ? error.message + ", check your network and try agan."
            : "Failed to fetch Summary, check your network and try agan."
        }`;
        toaster.error(err);
        setError(error.message || "Failed to fetch summary");
      } finally {
        setLoadingProgress(false);
      }
    };
    loadCollectedByCardsSummary();
    loadCollectedCardsSummary();
  }, [user]);

  useEffect(() => {
    if (triggerFetch) {
      fetchCards();
      setTriggerFetch(false); // Reset the trigger after fetching
    }
  }, [triggerFetch, fetchCards]);

  useEffect(() => {
    if (filterStates.length > 0) {
      setQueryParams((prevParams) => ({
        ...prevParams,
        ...transformFiltersToQueryParams(filterStates),
        page: 1,
      }));
      debouncedFetchCards();
    }
  }, [filterStates]);

  const handleSortChange = (value: string) => {
    setSortOption(value);
    setQueryParams((prevParams) => ({
      ...prevParams,
      page: 1,
      ordering: value,
    }));
    setCollectedCards([]); // Reset cards on new search
    setTriggerFetch(true); // Trigger the fetch after updating queryParams
  };
  const handleSearch = () => {
    setQueryParams((prevParams) => ({
      ...prevParams,
      page: 1,
      q: searchTerm,
    }));
    setSearchFilterError(true);
    setCollectedCards([]); // Reset cards on new search
    setTriggerFetch(true); // Trigger the fetch after updating queryParams
  };

  return (
    <main>
      <CommonLayout>
        <div className={`${styles.mainBox} w-100`}>
          <div className={styles.mobileSidebarBox}>
            <Collapsible text="Select category" isSidebar={true}>
              <Sidebar />
            </Collapsible>
          </div>
          <div
            className={`${styles.mainBoxContent} d-flex align-items-center justify-content-between`}
          >
            <div className={styles.text}>
              <h1>{dashText.heading}</h1>
              <p>{dashText.title}</p>
            </div>
            <div
              className={`${styles.cardBox} w-100 d-flex align-items-center`}
            >
              <StatisticCard
                heading="My Statistic"
                Icon1={Copy}
                Icon2={Star}
                firstTitle="Number of Cards"
                firstValue={`x${statistic?.count ?? 0}`}
                secondTitle="Collection Value"
                secondValue={`${statistic?.value ?? 0} $`}
                loading={loadingStats}
              />
              <ProgressCard
                heading="Set Progress"
                progressData={progressData}
                loading={loadingProgress}
              />
            </div>
          </div>
          {isAll ? (
            <div className={styles.allCard}>
              <div
                className={`${styles.mobileFooter} d-flex align-items-center justify-content-between`}
              >
                <IconButton
                  text="Filters"
                  Icon={MobileFilter}
                  iconPosition="right"
                  borderRadius="30px"
                  paddingX="10px"
                  backgroundColor="var(--red-200)"
                  hoverColor="rgba(211, 13, 68, .6)"
                  color="white"
                  onClick={() => setIsMobileFilter(true)}
                  width="170px"
                />
                <div className="position-relative">
                  <Search className="icon" />
                </div>
                <div>
                  <p className={styles.mobileFooterText}>Search results</p>
                  <p className={styles.mobileFooterText}>(48 items found)</p>
                </div>
              </div>
              <PaginatedCards
                ordering={orderBy}
                setOrder={setOrderBy}
                filterStates={filterStates}
                isOpen={isMobileFilter}
                setIsOpen={setIsMobileFilter}
                filters={filters}
                setFilterStates={setFilterStates}
              />
            </div>
          ) : (
            <>
              {isMobile && (
                <div className={`${styles.mobileContent}`}>
                  <div>
                    <Button
                      customClass="white-text-force w-100"
                      onClick={() => onButtonClick("all")}
                    >
                      View my all colection
                    </Button>
                  </div>
                  <CategoryCards
                    name="Recently added"
                    category="latest"
                    handleSeeMore={handleSeeMore}
                  />
                  <CategoryCards
                    name="Currently popular"
                    category="currentlyPopular"
                    handleSeeMore={handleSeeMore}
                  />
                  <CategoryCards
                    name="Increasing its value"
                    category="increasingSales"
                    handleSeeMore={handleSeeMore}
                  />
                </div>
              )}

              <div className={styles.secondaryBox}>
                <div
                  className={`${styles.header} d-flex align-items-center flex-wrap position-relative`}
                >
                  <div className="d-flex align-items-center gap-3">
                    <p className={styles.filterText}>Filters</p>
                    {loadingFilters ? (
                      <Spinner />
                    ) : (
                      <Filter
                        filters={filters}
                        filterStates={filterStates}
                        setFilterStates={setFilterStates}
                      />
                    )}
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <Button
                      onClick={handleSearch}
                      customClass="white-text-force"
                      borderRadius="100px"
                      paddingX="38px"
                      // disabled={searchTerm === ""}
                    >
                      Search
                    </Button>

                    <div className="position-relative">
                      <div
                        className={`${styles.searchIcon} d-flex align-items-center justify-content-center cursor-pointer`}
                        onClick={() => setSearchDropdown(true)}
                      >
                        <Search className="logoStroke" />
                      </div>
                      {searchDropdown && (
                        <div
                          className={`${styles.searchDropdown}`}
                          ref={searchDropdownRef}
                        >
                          <SearchInput
                            placeholder="Search cards..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* <IconButton
                    text="Advanced filters"
                    Icon={AdvanceFilter}
                    iconPosition="left"
                    borderRadius="30px"
                    paddingX="20px"
                    backgroundColor="var(--assistance-button-background)"
                    hoverColor="rgba(0, 0, 0, 0.1)"
                    // width="100%"
                    onClick={test}
                  /> */}
                </div>
                <hr className="dotted-line d-none d-lg-block m-0" />
                <div
                  className={`${styles.secondaryHeader} d-flex align-items-center justify-content-between`}
                >
                  <div className="d-flex align-items-center gap-4">
                    <p className={styles.secondaryFooterText1}>
                      Results ({totalCount} items found)
                    </p>
                    <p className={styles.secondaryFooterText2}>
                      Missing cards (22)
                    </p>
                  </div>
                  <CustomSortComponent
                    options={sortOptions}
                    selectedOption={sortOption}
                    onChange={handleSortChange}
                  />
                </div>
                <CardLayout>
                  {collectedCards.length > 0 &&
                    collectedCards.map((card, index) => {
                      const gradesData = getGradeDetails(card.grade);
                      return (
                        <div
                          key={index}
                          className={`${styles.cardFlex} mb-4 position-relative`}
                        >
                          <Card
                            imageSrc={card.front_image}
                            cardIcon={card.team_detail?.image || null}
                            teamName={card.team_detail?.name || ""}
                            teamYear={card.year || ""}
                            name={card.player_detail?.title || "NA"}
                            info={card.cardset_detail?.name || "NA"}
                            mintIcon={gradesData?.icon}
                            mintStatus={gradesData?.abbreviation}
                            mintText={gradesData?.text}
                            price={card.average_sale_price}
                            cardStatus={card.status}
                            cardNumber={card.number}
                          />
                          <div className={styles.customLines}>
                            <div className={styles.customLinesBottom}></div>
                            <div className={styles.customLinesBox}></div>
                          </div>
                        </div>
                      );
                    })}
                </CardLayout>
                {loadingCards && <Spinner />}
                {collectedCards.length === 0 && !loadingCards && (
                  <div className={styles.emptyCollection}>
                    <p className={styles.emptyHeading}>
                      Your collection is empty!
                    </p>
                    {filterStates.length === 0 && !searchFilterError ? (
                      <>
                        <p className={styles.emptyText}>Add your first cards</p>
                        <Button
                          customClass="white-text-force m-auto"
                          onClick={onAddcard}
                        >
                          Add the first card
                        </Button>
                      </>
                    ) : (
                      <p className={styles.emptyText}>
                        No cards in your collection with the selected filters!
                      </p>
                    )}
                  </div>
                )}

                {collectedCards.length > 0 && <div ref={loaderRef}></div>}
              </div>
            </>
          )}
        </div>
      </CommonLayout>
    </main>
  );
};
export default withAuth(Dashboard);
