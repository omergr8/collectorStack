"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./AddCard.module.css";

import CardDescription from "@/public/icons/cardDescription.svg";
import InfoIcon from "@/public/icons/additionalInfo.svg";

import CustomInput from "@/components/CustomInput";
import SelectBox from "@/components/SelectBox";
import ReactSelect from "@/components/ReactSelect";
import Button from "@/components/Button";
import DragAndDrop from "@/components/DragAndDropUpload";
import SearchBox from "@/components/SearchBox";
import CommonLayout from "@/components/CommonLayout";
import Checkbox from "@/components/CheckBox";
import AutocompleteInput from "@/components/AutocompleteInput";
import Popup from "@/components/Popup";

import { AddCardProps } from "@/constants/types";
import { player } from "@/api/core/player";
import { card } from "@/api/core/card";
import { userCollectedCard } from "@/api/core/userCollectedCard";
import { cardSet } from "@/api/core/cardSet";

import { useAuth } from "@/hooks";
import { routes } from "@/config/routes";

const emptyValues = {
  cardName: "",
  player: "",
  team: "",
  set: "",
  year: "",
  additionalYear: "",
  priceHistory: "",
  class: "",
  state: "",
  value: "",
  grade: null,
  sportsType: "",
};

const AddCard = () => {
  const { user, sportstype } = useAuth();
  const router = useRouter();
  const [descriptionValues, setDescriptionValues] =
    useState<AddCardProps>(emptyValues);
  const [frontImage, setFrontImage] = useState<File | null>(null);
  const [backImage, setBackImage] = useState<File | null>(null);
  const [selectedCard, setSelectedCard] = useState<any>();
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [filters, setFilters] = useState<any>([]);
  const [sportsTypeOptions, setSportsTypeOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const getFiltersAndSetState = async () => {
    const transformedArray = sportstype.map((item: any) => ({
      label: item.name,
      value: item.name,
    }));
    setSportsTypeOptions(transformedArray);
  };

  useEffect(() => {
    sportstype.length > 0 && getFiltersAndSetState();
  }, [sportstype]);

  useEffect(() => {
    if (isCustom) {
      setSelectedCard(undefined);
    }
    setDescriptionValues(emptyValues);
    setErrors({});
  }, [isCustom]);

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | string,
    field: string
  ) => {
    // Determine the new value based on the field type
    const newValue =
      field === "sportsType"
        ? e
        : (
            e as
              | React.ChangeEvent<HTMLInputElement>
              | React.ChangeEvent<HTMLSelectElement>
          ).target?.value;

    // Update the state with the new value
    setDescriptionValues({
      ...descriptionValues,
      [field]: newValue,
    });
  };

  const handleFrontImage = (file: File | null) => {
    if (file) {
      setFrontImage(file);
    } else {
      setFrontImage(null);
    }
  };

  const handleBackImage = (file: File | null) => {
    if (file) {
      setBackImage(file);
    } else {
      setBackImage(null);
    }
  };

  // Memoize the fetchSearchResults function
  const fetchSearchResults = useCallback(async (query: string) => {
    setLoading(true);
    try {
      const response = await card.getAll(query);
      return response.results;
    } catch (error: any) {
      console.error("Error fetching cards:", error.message);
    } finally {
      setLoading(false);
    }
  }, []);
  const fetchPlayerOptions = useCallback(async (query: string) => {
    setLoading(true);
    try {
      const response = await player.getAll({
        q: query,
        sportstype: descriptionValues.sportsType || "Baseball",
      });
      const transformedArray = response.results.map((item: any) => ({
        label: item.name,
        value: item.name,
      }));
      return transformedArray;
    } catch (error: any) {
      console.error("Error fetching cards:", error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchSetOptions = useCallback(async (query: string) => {
    setLoading(true);
    try {
      const response = await cardSet.getAll({
        q: query,
        sportstype: descriptionValues.sportsType || "Baseball",
      });
      const transformedArray = response.results.map((item: any) => ({
        label: item.title,
        value: item.title,
      }));
      return transformedArray;
    } catch (error: any) {
      console.error("Error fetching cards:", error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleReset = () => {
    setDescriptionValues(emptyValues);
    setFrontImage(null);
    setSelectedCard(undefined);
    setErrors({});
    setBackImage(null);
  };

  const validateForm = () => {
    let formErrors: { [key: string]: string } = {};

    if (isCustom) {
      if (!descriptionValues.cardName)
        formErrors.cardName = "Card Name is required.";
      if (!descriptionValues.sportsType)
        formErrors.sportsType = "Sports Type is required.";
      if (!frontImage) formErrors.frontImage = "Front Image is required.";
      if (!backImage) formErrors.backImage = "Back Image is required.";
    } else {
      if (!selectedCard) formErrors.selectedCard = "Selected Card is required.";
    }

    setErrors(formErrors);

    return Object.keys(formErrors).length === 0;
  };

  const handleAddCustomCollectedCard = async () => {
    if (!user?.username || !frontImage || !backImage) return;
    setSubmitLoading(true);
    try {
      const result = await userCollectedCard(user.username).createCustom(
        descriptionValues.cardName,
        frontImage ?? null,
        backImage,
        descriptionValues.sportsType,
        descriptionValues.grade,
        descriptionValues.set,
        descriptionValues.player
      );
      setPopupOpen(true);
    } catch (error) {
      console.error("Failed to add custom card:", error);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleAddCollectedCard = async () => {
    if (!user?.username || !selectedCard.id) return;
    setSubmitLoading(true);
    try {
      const result = await userCollectedCard(user.username).create(
        selectedCard.id,
        descriptionValues.grade,
        frontImage,
        backImage
      );
      setPopupOpen(true);
    } catch (error) {
      console.error("Failed to add card:", error);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Proceed with submission
      if (isCustom) {
        handleAddCustomCollectedCard();
      } else {
        handleAddCollectedCard();
      }
    }
  };

  const handleGotoCollection = () => {
    router.push(routes.core.dashboard);
  };
  const handleAddAnotherCard = () => {
    handleReset();
    setPopupOpen(false);
  };

  return (
    <CommonLayout>
      <div className="w-100">
        <Popup
          isOpen={isPopupOpen}
          onClose={() => setPopupOpen(!isPopupOpen)}
          maxWidth="600px"
          borderRadius="15px"
        >
          <div className={styles.popupMain}>
            <p className={styles.details}>Confirmation</p>
            <h2>
              Your card has been <span>successfully</span> added to the
              collection
            </h2>
            <div className="d-flex justify-content-center gap-2 mt-4">
              <Button onClick={handleGotoCollection} type="dark">
                Go to My Collection
              </Button>
              <Button
                onClick={handleAddAnotherCard}
                customClass="white-text-force"
              >
                Add Another Card
              </Button>
            </div>
          </div>
        </Popup>
        <div className={styles.box}>
          <div className={`${styles.text} mb-3`}>
            <h1>
              Add <span>New Card</span> to your Collection
            </h1>
            <p>
              Enter the details of the card to add it to your collection. Make
              sure all information is accurate.
            </p>
          </div>
          {!isCustom && (
            <div className="mb-3">
              <SearchBox
                onSearch={fetchSearchResults}
                selectedData={selectedCard}
                setSelectedData={setSelectedCard}
                error={errors.selectedCard}
              />
            </div>
          )}
          <div className={`${styles.notFound} d-flex align-items-center`}>
            <p>{`Can't find the card you're looking for? Add a custom one.`}</p>
            <Checkbox
              checked={isCustom}
              onChange={(checked: boolean) => setIsCustom(checked)}
            />
          </div>
          <div>
            <div className="row d-flex align-items-stretch mb-4">
              <div className="col-12">
                <div className={`${styles.commonBox} h-100`}>
                  <div
                    className={`${styles.description} d-flex align-items-center`}
                  >
                    <div
                      className={`${styles.iconBox} d-flex align-items-center justify-content-center`}
                    >
                      <CardDescription />
                    </div>
                    <h3>Card Description</h3>
                  </div>
                  <div className="row">
                    {isCustom && (
                      <>
                        <div className="col-lg-4 col-sm-12">
                          <CustomInput
                            label="Card Name"
                            placeholder="Name"
                            value={descriptionValues.cardName}
                            onChange={(e) => handleInputChange(e, "cardName")}
                            required={true}
                            error={errors.cardName}
                          />
                        </div>
                        <div className="col-lg-4 col-sm-12">
                          <ReactSelect
                            label="Sports Type"
                            value={descriptionValues.sportsType}
                            onChange={(e) => handleInputChange(e, "sportsType")}
                            options={sportsTypeOptions}
                            required={true}
                            error={errors.sportsType}
                          />
                        </div>
                        {descriptionValues.sportsType &&
                          descriptionValues.sportsType !== "" && (
                            <>
                              <div className="col-lg-4 col-sm-12">
                                <AutocompleteInput
                                  placeholder="Type player name..."
                                  label="Player"
                                  value={descriptionValues.player}
                                  onChange={(val: any) =>
                                    setDescriptionValues({
                                      ...descriptionValues,
                                      ["player"]: val,
                                    })
                                  }
                                  fetchOptions={fetchPlayerOptions}
                                />
                              </div>
                              <div className="col-lg-4 col-sm-12">
                                <AutocompleteInput
                                  placeholder="Type set name..."
                                  label="Card Set"
                                  value={descriptionValues.set}
                                  onChange={(val: any) =>
                                    setDescriptionValues({
                                      ...descriptionValues,
                                      ["set"]: val,
                                    })
                                  }
                                  fetchOptions={fetchSetOptions}
                                />
                              </div>
                            </>
                          )}
                      </>
                    )}
                    <div className="col-lg-4 col-sm-12">
                      <CustomInput
                        label="Grade"
                        placeholder="Grade"
                        type="number"
                        value={descriptionValues.grade || ""}
                        onChange={(e) => handleInputChange(e, "grade")}
                      />
                    </div>
                    {/* <div className="col-lg-4 col-sm-12">
                      <CustomInput
                        label="Team"
                        placeholder="Team"
                        value={descriptionValues.team}
                        onChange={(e) => handleInputChange(e, "team")}
                      />
                    </div>
                    <div className="col-lg-4 col-sm-12">
                      <CustomInput
                        label="Year"
                        placeholder="Year"
                        value={descriptionValues.year}
                        onChange={(e) => handleInputChange(e, "year")}
                      />
                    </div>
                    <div className="col-lg-4 col-sm-12">
                      <SelectBox
                        label="Class (e.g. PSA 10)"
                        value={descriptionValues.class}
                        onChange={(e) => handleInputChange(e, "class")}
                        options={options}
                      />
                    </div>
                    <div className="col-lg-4 col-sm-12">
                      <SelectBox
                        label="State (e.g., Mint)"
                        value={descriptionValues.state}
                        onChange={(e) => handleInputChange(e, "state")}
                        options={options}
                      />
                    </div>
                    <div className="col-lg-4 col-sm-12">
                      <CustomInput
                        label="Value (in $)"
                        placeholder="Value"
                        value={descriptionValues.value}
                        onChange={(e) => handleInputChange(e, "value")}
                      />
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="row d-flex align-items-stretch gap-2 gap-lg-0">
              <div className="col-lg-6 col-sm-12">
                <div className={`${styles.commonBox} h-100`}>
                  <div
                    className={`${styles.description} d-flex align-items-center`}
                  >
                    <div
                      className={`${styles.iconBox} d-flex align-items-center justify-content-center`}
                    >
                      <CardDescription />
                    </div>
                    <h3>
                      Front Image{" "}
                      {isCustom && <span className="required">*</span>}
                    </h3>
                  </div>
                  <div>
                    <DragAndDrop
                      onFileSelect={handleFrontImage}
                      maxFileSizeMB={5}
                      height="260px"
                      borderColor="var(--red-200)"
                      textColor="black"
                      selectedImage={frontImage}
                      onRemoveImage={() => setFrontImage(null)}
                      error={errors.frontImage}
                      id="front"
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-sm-12">
                <div className={`${styles.commonBox} h-100`}>
                  <div
                    className={`${styles.description} d-flex align-items-center`}
                  >
                    <div
                      className={`${styles.iconBox} d-flex align-items-center justify-content-center`}
                    >
                      <CardDescription />
                    </div>
                    <h3>
                      Back Image{" "}
                      {isCustom && <span className="required">*</span>}
                    </h3>
                  </div>
                  <div>
                    <DragAndDrop
                      id="back"
                      onFileSelect={handleBackImage}
                      maxFileSizeMB={5}
                      height="260px"
                      borderColor="var(--red-200)"
                      textColor="black"
                      selectedImage={backImage}
                      onRemoveImage={() => setBackImage(null)}
                      error={errors.backImage}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* <div className={`${styles.commonBox} mt-4 h-100`}>
              <div className={`${styles.description} d-flex align-items-center`}>
              <div className={`${styles.iconBox} d-flex align-items-center justify-content-center`}>
                  <InfoIcon />
                </div>
                <h3>Additional information</h3>
              </div>
              <div className="row">
                <div className="col-lg-8 col-sm-12">
                  <CustomInput
                    label="Year"
                    placeholder="Year"
                    value={descriptionValues.additionalYear}
                    onChange={(e) => handleInputChange(e, "additionalYear")}
                  />
                </div>
                <div className="col-lg-4 col-sm-12">
                  <CustomInput
                    label="Price History"
                    placeholder="History"
                    value={descriptionValues.priceHistory}
                    onChange={(e) => handleInputChange(e, "priceHistory")}
                  />
                </div>
              </div>
            </div> */}
          </div>
          <div className="d-flex gap-2 mt-4 justify-content-end">
            <Button onClick={handleReset} type="secondary">
              Reset
            </Button>
            <Button
              onClick={handleSubmit}
              loading={submitLoading}
              disabled={submitLoading}
              customClass="white-text-force"
            >
              Add Card
            </Button>
          </div>
        </div>
      </div>
    </CommonLayout>
  );
};

export default AddCard;
