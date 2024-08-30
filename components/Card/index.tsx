import React from "react";
import Image from "next/image";
import styles from "./Card.module.css";
import Tooltip from "../Tooltip";
import { CardProps } from "@/constants/types";
import StatusBox from "../StatusBox";

const Card: React.FC<CardProps> = ({
  imageSrc,
  cardIcon,
  teamName,
  teamYear,
  name,
  info,
  mintStatus,
  mintIcon: MintIcon,
  price,
  isFullWidth = false,
  isImageBorder = true,
  isSidebar = false,
  mintText,
  cardNumber,
  cardStatus,
}) => {
  const isCardPendingOrRejected = (status?: string): boolean => {
    return status === "pending_approval" || status === "rejected";
  };
  return (
    <div
      className={`${!isFullWidth && styles.main} ${
        !isSidebar && styles.mainBox
      }`}
    >
      <div
        className={`${styles.imageBox} ${isImageBorder && styles.imageBorder} ${
          isCardPendingOrRejected(cardStatus) && styles.statusImageBox
        } ${
          cardStatus === "rejected"
            ? styles.borderRed
            : cardStatus === "pending_approval"
            ? styles.borderYellow
            : ""
        } d-flex align-items-center justify-content-center position-relative`}
      >
        <div>
          {isCardPendingOrRejected(cardStatus) && (
            <div className={styles.status}>
              <StatusBox
                text={
                  cardStatus === "rejected" ? "Rejected" : "Pending Approval"
                }
                status={cardStatus || ""}
              />
            </div>
          )}
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt="card"
              height={200}
              width={144}
              className={`${
                !isSidebar &&
                !isCardPendingOrRejected(cardStatus) &&
                styles.cardImage
              } ${
                !isSidebar &&
                isCardPendingOrRejected(cardStatus) &&
                styles.statusCardImage
              }`}
            />
          ) : (
            <div className={styles.placeholder} />
          )}
          {cardNumber && (
            <div className={styles.cardNumber}>
              <p className={styles.numberText}>#{cardNumber}</p>
            </div>
          )}
        </div>
      </div>
      <div className={`${styles.detailBox} ${isSidebar && styles.lastCardDetailBox}`}>
        <div className="d-flex align-items-center justify-content-between mb-1 mb-md-3 gap-1">
          <div
            className={`${styles.roundedBox} ${
              isFullWidth && "min-width-unset w-75"
            } d-flex gap-3 gap-md-2 align-items-center`}
          >
            {cardIcon !== null && (
              <Image src={cardIcon} alt="cardIcon" height={16} width={16} />
            )}
            <p className={styles.teamName}>{teamName}</p>
          </div>
          <div
            className={`${styles.roundedBoxYear} ${
              isFullWidth && "min-width-unset"
            } d-flex align-items-center justify-content-center`}
          >
            <p className={styles.teamYear}>{teamYear}</p>
          </div>
        </div>
        <div className={styles.cardDetails}>
          <h3 className={styles.name}>{name}</h3>
          <p className={styles.info}>{info}</p>
        </div>
        { <hr className="dotted-line" />}
        <div
          className={`${styles.cardFooter} d-flex align-items-center justify-content-between`}
        >
         <div className="d-flex gap-2">
              {MintIcon && <MintIcon />}
              <p className={styles.footerText}>{mintStatus}</p>
            </div>

          <p className={styles.footerText}>{price}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
