import React, { useEffect, useState, useCallback, useRef } from "react";
import { debounce } from "lodash";

import { useAuth } from "@/hooks";
import { userCollectedCard } from "@/api/core/userCollectedCard";
import {
  getGradeDetails,
  transformFiltersToQueryParams,
} from "@/constants/helper";
import { FilterType } from "@/constants/types";

import Card from "@/components/Card";
import CardLayout from "@/components/Layout/CardLayout";
import Spinner from "@/components/Spinner";
import toaster from "@/components/Toast/Toast";
import MobileFilters from "../MobileFilters";
import ReactPaginate from "react-paginate";

import styles from "@/app/dashboard/dashboard.module.css";

interface PaginatedProps {
  ordering: string;
  setOrder: (order: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  filters: FilterType[];
  filterStates: Array<{ filterName: string; values: (string | number)[] }>;
  setFilterStates: React.Dispatch<
    React.SetStateAction<
      Array<{ filterName: string; values: (string | number)[] }>
    >
  >;
}

const itemsPerPage = 8;
const PaginatedCards: React.FC<PaginatedProps> = ({
  ordering,
  setOrder,
  filterStates,
  isOpen,
  setIsOpen,
  filters,
  setFilterStates,
}) => {
  const { user } = useAuth();

  const [collectedCards, setCollectedCards] = useState<any[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorOccurred, setErrorOccurred] = useState(false);
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [queryParams, setQueryParams] = useState({
    page: 1,
    page_size: itemsPerPage,
    q: "",
    ordering: ordering || "",
  });
  const queryParamsRef = useRef(queryParams);
  const loadingCardsRef = useRef(false);

  useEffect(() => {
    queryParamsRef.current = queryParams;
  }, [queryParams]);

  const loadMoreCards = useCallback(
    async (page: number) => {
      if (!user?.username || loadingCardsRef.current || errorOccurred) return;

      loadingCardsRef.current = true;
      setLoading(true);
      try {
        const response = await userCollectedCard(user.username).getAll({
          ...queryParamsRef.current,
          page: page,
        });
        // Calculate total pages
        setPageCount(Math.ceil(response.count / itemsPerPage));

        // Update the cards state
        setCollectedCards(response.results);
      } catch (error: any) {
        console.error("Error fetching more cards:", error.message);
        toaster.error(
          error.message
            ? `${error.message}, check your network and try again.`
            : "Failed to fetch collected cards, check your network and try again."
        );
        setErrorOccurred(true);
      } finally {
        setLoading(false);
        loadingCardsRef.current = false;
      }
    },
    [user, errorOccurred, itemsPerPage]
  );

  // Load cards initially on component mount
  useEffect(() => {
    loadMoreCards(1); // Load the first page initially
  }, [loadMoreCards]);
  const debouncedFetchCards = useCallback(
    debounce(() => {
      setCollectedCards([]);
      loadMoreCards(1);
    }, 600), // Adjust the debounce delay as needed
    [loadMoreCards]
  );

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

  // Handle page click event
  const handlePageClick = (event: any) => {
    const selectedPage = event.selected + 1; // Convert 0-based index to 1-based page number
    setCurrentPage(selectedPage);
    loadMoreCards(selectedPage);
  };
  useEffect(() => {
    if (triggerFetch) {
      loadMoreCards(1);
      setTriggerFetch(false); // Reset the trigger after fetching
    }
  }, [triggerFetch, loadMoreCards]);
  const handleSearch = (val: string) => {
    setQueryParams((prevParams) => ({
      ...prevParams,
      ordering: ordering,
      q: val,
    }));
    setCollectedCards([]);
    setTriggerFetch(true);
  };

  if (errorOccurred) return null;

  return (
    <div className={styles.paginatedCards}>
      <MobileFilters
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        filters={filters}
        filterStates={filterStates}
        setFilterStates={setFilterStates}
        handleSearch={handleSearch}
        ordering={ordering}
        setOrder={setOrder}
      />
      {loading ? (
        <Spinner />
      ) : (
        <CardLayout>
          {collectedCards.map((card, index) => {
            const gradesData = getGradeDetails(card.grade);
            return (
              <div key={index} className={`${styles.cardFlex}`}>
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
              </div>
            );
          })}
        </CardLayout>
      )}

      <div className={styles.reactPaginated}>
        <ReactPaginate
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="<"
          pageClassName="pageItem"
          pageLinkClassName="pageLink"
          previousClassName="arrow"
          previousLinkClassName="pageLink"
          nextClassName="arrow"
          nextLinkClassName="pageLink"
          breakLabel="..."
          breakClassName="pageItem"
          breakLinkClassName="pageLink"
          containerClassName="pagination-container"
          activeClassName="active"
          renderOnZeroPageCount={null}
          forcePage={currentPage - 1}
        />
      </div>
    </div>
  );
};

export default PaginatedCards;
