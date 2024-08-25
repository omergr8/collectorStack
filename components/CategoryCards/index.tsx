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

interface CategoryCardsProps {
  category: string;
  name: string;
}

const CategoryCards: React.FC<CategoryCardsProps> = ({ category, name }) => {
  const { user } = useAuth();
  const { data, fetchCategoryData } = useCategoryData(); // Access the context
  const [loading, setLoading] = useState(false);
  const [errorOccurred, setErrorOccurred] = useState(false);
  const loadingCardsRef = useRef(false);

  const getOrderParam = (category: string) => {
    switch (category) {
      case "latest":
        return "-created_date";
      case "increasingSales":
        return "-card__average_sale_price";
      case "currentlyPopular":
        return "-grade";
      default:
        return "";
    }
  };

  const fetchCards = useCallback(async () => {
    if (!user?.username || loadingCardsRef.current) return; // Prevent double fetching
    loadingCardsRef.current = true;

    const fetchFunction = async () => {
      const response = await userCollectedCard(user.username).getAll({
        ordering: getOrderParam(category),
        page_size: 3,
        page: 1,
      });
      return response.results;
    };

    setLoading(true);
    setErrorOccurred(false);

    try {
      await fetchCategoryData(category, fetchFunction);
    } catch (error: any) {
      console.error("Error fetching cards:", error);
      let err = `${
        error.message
          ? error.message + ", check your network and try again."
          : "Failed to fetch Collected Cards, check your network and try again."
      }`;
      toaster.error(err);
      setErrorOccurred(true);
    } finally {
      setLoading(false);
      loadingCardsRef.current = false;
    }
  }, [category, user, fetchCategoryData]);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  if (loading) return <Spinner />;
  if (errorOccurred) return null;

  const cards = data[category] || [];

  return (
    <div className={styles.collapsibleDiv}>
      <Collapsible text={name}>
        <CardLayout>
          {cards.map((card, index) => {
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
        <Button
          onClick={() => console.log("See more clicked")}
          customClass="mt-3 w-100"
          type="secondary"
        >
          See more
        </Button>
      </Collapsible>
    </div>
  );
};

export default CategoryCards;
