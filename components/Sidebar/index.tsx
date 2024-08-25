"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Sidebar.module.css";
import { sideLinks } from "@/constants/constants";
import Arrow from "@/public/icons/arrow.svg";
import Card from "@/components/Card";
import IconButton from "../IconButton";
import { useRouter } from "next/navigation";
import NoGrade from "@/public/icons/Grades/noGrade.svg";
import InfoIcon from "@/public/icons/info.svg";
import toaster from "../Toast/Toast";
import { collectedCard } from "@/api/core/collectedCard";
import Spinner from "../Spinner";
import { getGradeDetails } from "@/constants/helper";
import { useAuth } from "@/hooks";

export default function Sidebar() {
  const { lastCard } = useAuth();
  const router = useRouter();

  const handleAssistance = () => {};

  const gradesData = lastCard ? getGradeDetails(lastCard.grade) : null;

  return (
    <div className={`${styles.main} w-100`}>
      <div className="container-80">
        {sideLinks.map((sideLink, index) => {
          const IconComponent = sideLink.icon;
          return (
            <div key={index}>
              <div className="d-flex align-items-center gap-4 mb-3">
                <IconComponent />
                <p className={styles.heading}>{sideLink.name}</p>
              </div>
              <div className="d-flex flex-column gap-2">
                {sideLink.links.map((link, linkIndex) => {
                  if (link.label === "Add Card") {
                    return (
                      <div
                        key={linkIndex}
                        className={`customLink d-flex align-items-center gap-4 cursor-pointer`}
                      >
                        <Arrow />
                        <IconButton
                          text={link.label}
                          color="white"
                          // Icon={Arrow}
                          iconPosition="left"
                          borderRadius="10px"
                          paddingX="20px"
                          backgroundColor="var(--red-200)"
                          hoverColor="var(--red-400)"
                          width="80%"
                          onClick={() => router.push(link.id)}
                        />
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={linkIndex}
                      href={link.id}
                      className={`customLink d-flex align-items-center gap-4 cursor-pointer ${styles.link}`}
                    >
                      <Arrow />
                      {link.label}
                    </Link>
                  );
                })}
              </div>
              {sideLinks.length > index + 1 && <hr className="dotted-line" />}
            </div>
          );
        })}
        {lastCard && (
          <div className={styles.lastCardBox}>
            <h4 className={styles.cardText}>Last added card</h4>
            <div className="w-85 m-auto">
              <hr className="dotted-line" />
            </div>
            <Card
              imageSrc={lastCard.front_image}
              cardIcon={lastCard.team_detail?.image || null}
              teamName={lastCard.team_detail?.name || ""}
              teamYear={lastCard.year || ""}
              name={lastCard.player_detail?.title || "NA"}
              info={lastCard.cardset_detail?.name || "NA"}
              mintIcon={gradesData?.icon}
              mintStatus={gradesData?.abbreviation || ""}
              mintText={gradesData?.text}
              price={lastCard.average_sale_price}
              cardStatus={lastCard.status}
              cardNumber={lastCard.number}
              isFullWidth={true}
              isImageBorder={false}
              isSidebar={true}
            />
          </div>
        )}

        <div className="mt-3">
          <IconButton
            text="Assistance & Support"
            Icon={InfoIcon}
            iconPosition="left"
            borderRadius="30px"
            paddingX="20px"
            backgroundColor="var(--assistance-button-background)"
            hoverColor="rgba(0, 0, 0, 0.1)"
            width="100%"
            onClick={handleAssistance}
          />
        </div>
      </div>
    </div>
  );
}
