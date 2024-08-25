import React, { useEffect, useState, useCallback, useRef } from "react";
import { useAuth } from "@/hooks";
import { userCollectedCard } from "@/api/core/userCollectedCard";
import { getGradeDetails } from "@/constants/helper";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Collapsible from "@/components/Collapsible";
import CardLayout from "@/components/Layout/CardLayout";
import Spinner from "@/components/Spinner";
import { useCategoryData } from "@/context/CategoryDataContext"; // Import your context
import styles from "@/app/dashboard/dashboard.module.css";
import toaster from "@/components/Toast/Toast";
import ReactPaginate from "react-paginate";

const itemsPerPage = 8;
const PaginatedCards: React.FC = () => {
  const { user } = useAuth();
  const { data, fetchCategoryData } = useCategoryData(); // Access the context
  const [collectedCards, setCollectedCards] = useState<any[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorOccurred, setErrorOccurred] = useState(false);
  const loadingCardsRef = useRef(false);

  const loadMoreCards = useCallback(
    async (page: number) => {
      if (!user?.username || loadingCardsRef.current || errorOccurred) return;

      loadingCardsRef.current = true;
      setLoading(true);
      try {
        const response = await userCollectedCard(user.username).getAll({
          page_size: itemsPerPage,
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

  // Handle page click event
  const handlePageClick = (event: any) => {
    const selectedPage = event.selected + 1; // Convert 0-based index to 1-based page number
    setCurrentPage(selectedPage);
    loadMoreCards(selectedPage);
  };

  if (errorOccurred) return null;

  return (
    <div className={styles.paginatedCards}>
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
