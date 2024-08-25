import React, { useEffect, useState, useRef } from "react";
import styles from "./ProgressCard.module.css";
import PercentageBar from "../PercentageBar";
import Spinner from "../Spinner";
import Button from "../Button";
import LeftArrowIcon from "@/public/icons/LeftArrowIcon.svg";
import RightArrowIcon from "@/public/icons/RightArrowIcon.svg";
import { ProgressCardProps } from "@/constants/types";
import { percentageCalculator } from "@/constants/helper";
import { progressText } from "@/constants/constants";

const ProgressCard: React.FC<ProgressCardProps> = ({
  heading = "Set Progress",
  progressData,
  loading,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState<number>(3);
  const carouselContainerRef = useRef<HTMLDivElement>(null);
  const slideWidth = 136.66;

  useEffect(() => {
    const handleResize = () => {
      if (carouselContainerRef.current) {
        const containerWidth = carouselContainerRef.current.offsetWidth;
        if (containerWidth <= 361) {
          setVisibleSlides(2);
        } else if (containerWidth > 361) {
          setVisibleSlides(3);
        }
      }
    };

    handleResize(); // Set initial width
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const nextSlide = () => {
    if (progressData)
      setCurrentIndex((prevIndex) => {
        const maxIndex = progressData.results.length - visibleSlides;
        return prevIndex >= maxIndex ? maxIndex : prevIndex + 1;
      });
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? 0 : prevIndex - 1));
  };

  const handleExploreSets = () => {};

  return (
    <div className={`${styles.card} ${loading && "align-items-center"} d-flex`}>
      {loading ? (
        <Spinner />
      ) : progressData && progressData?.results.length > 0 ? (
        <div className="w-100">
          <div
            className={`${styles.header} d-flex align-items-center justify-content-between`}
          >
            <h3 className={styles.heading}>{heading}</h3>
            <div className="d-flex gap-1">
              <div
                className={`${styles.iconDiv} ${
                  currentIndex === 0 ? styles.disabledIcon : ""
                } d-flex align-items-center justify-content-center cursor-pointer`}
                onClick={prevSlide}
              >
                <LeftArrowIcon
                  className={`${styles.arrow} ${
                    currentIndex === 0 ? styles.disabled : ""
                  }`}
                />
              </div>
              <div
                className={`${styles.iconDiv} ${
                  currentIndex >= progressData.results.length - visibleSlides &&
                  styles.disabledIcon
                } d-flex align-items-center justify-content-center cursor-pointer`}
                onClick={nextSlide}
              >
                <RightArrowIcon
                  className={`${styles.arrow} ${
                    currentIndex >=
                      progressData.results.length - visibleSlides &&
                    styles.disabled
                  }`}
                />
              </div>
            </div>
          </div>
          <hr className="dotted-line m-0" />
          <div className={styles.carouselContainer} ref={carouselContainerRef}>
            <div
              className={styles.carousel}
              style={{
                transform: `translateX(-${currentIndex * (slideWidth + 10)}px)`,
              }}
            >
              {progressData.results.map((item, index) => {
                // Determine if this slide is the last visible one
                let isLastVisible = index === currentIndex + visibleSlides - 1;
                if (
                  currentIndex >=
                  progressData.results.length - visibleSlides
                ) {
                  isLastVisible = false;
                }
                return (
                  <div
                    key={index}
                    className={`${styles.progressBox} ${
                      isLastVisible ? styles.lastVisible : ""
                    }`}
                    style={{ width: slideWidth }}
                  >
                    <p className={styles.title}>{item.title}</p>
                    <p
                      className={styles.description}
                    >{`${item.collectedcard_count_distinct}/${item.card_count} cards`}</p>
                    <div className="mt-3">
                      <PercentageBar
                        percentage={percentageCalculator(
                          item.collectedcard_count_distinct,
                          item.card_count
                        )}
                        textPosition="after"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-100">
          <div className="text-start">
            <h3 className={styles.heading}>{heading}</h3>
            <p className={`${styles.helperText} mt-3`}>{progressText}</p>
            <div className="mt-3">
              <Button
                customClass="text-white-force"
                onClick={handleExploreSets}
              >
                Explore Sets
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressCard;
