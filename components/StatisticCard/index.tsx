import React from "react";
import styles from "./StatisticCard.module.css";
import DotIcon from "@/public/icons/threeDots.svg";
import { StatisticCardProps } from "@/constants/types";
import Spinner from "../Spinner";

const StatisticCard: React.FC<StatisticCardProps> = ({
  heading = "My Statistic",
  Icon1,
  Icon2,
  firstTitle,
  firstValue,
  secondTitle,
  secondValue,
  loading,
}) => {
  return (
    <div className={`${styles.card} ${loading && "align-items-center"} d-flex`}>
      {loading ? (
        <Spinner />
      ) : (
        <div className="w-100">
          <div className={`${styles.header} d-flex align-items-center justify-content-between`}>
            <h3 className={styles.heading}>{heading}</h3>
            <div
              className={`${styles.icon} d-flex align-items-center justify-content-center`}
            >
              <DotIcon className="logo" />
            </div>
          </div>
          <hr className="dotted-line m-0 mb-2" />
          <div className={`${styles.infoBox} d-flex flex-column gap-2`}>
            <div
              className={`${styles.info} d-flex align-items-center justify-content-between`}
            >
              <div className="d-flex align-items-center gap-2">
                {Icon1 && <Icon1 />}
                <p className="mb-0">{firstTitle}</p>
              </div>
              <div className={styles.firstValue}>
                <p className="mb-0">{firstValue}</p>
              </div>
            </div>
          </div>
          <div className={`${styles.infoBox} d-flex flex-column gap-2`}>
            <div
              className={`${styles.info} d-flex align-items-center justify-content-between`}
            >
              <div className="d-flex align-items-center gap-2">
                {Icon2 && <Icon2 />}
                <p className="mb-0">{secondTitle}</p>
              </div>
              <div className={styles.secondValue}>
                <p className="mb-0"> {secondValue}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatisticCard;
