import React from "react";
import CustomInput from "@/components/CustomInput";
import { registerText } from "@/constants/constants";
import Button from "@/components/Button";
import { BankingDetailsProps } from "@/constants/types";

const BankingDetails: React.FC<BankingDetailsProps> = ({
  prevStep,
  handleSubmit,
  handleInputChange,
  values,
}) => {
  return (
    <div>
      <h3 className={`authTitle`}>{registerText.title3}</h3>
      <p className={`authSmallerText`}>{registerText.info3}</p>

      <div className="w-100 mt-5 text-start">
        <h3 className="authSemiHeading">Billing Address</h3>
      </div>
      <div className="d-grid authGridTemplate mt-4 mb-4 gap-3">
        <CustomInput
          label="Street Address"
          placeholder="Street Address"
          value={values.billingStreetAddress}
          onChange={(e) => handleInputChange(e, "billingStreetAddress")}
          lineColor="green"
        />
        <CustomInput
          label="Province"
          placeholder="Province"
          value={values.billingProvince}
          onChange={(e) => handleInputChange(e, "billingProvince")}
          lineColor="green"
        />
        <CustomInput
          label="City"
          placeholder="City"
          value={values.billingCity}
          onChange={(e) => handleInputChange(e, "billingCity")}
        />
        <CustomInput
          label="Country"
          placeholder="Country"
          value={values.billingCountry}
          onChange={(e) => handleInputChange(e, "billingCountry")}
        />
        <CustomInput
          label="Zip/Postal Code"
          placeholder="Zip/Postal Code"
          value={values.billingZipCode}
          onChange={(e) => handleInputChange(e, "billingZipCode")}
        />
      </div>
      <hr className="dotted-line" />
      <div className="w-100 mt-5 text-start">
        <h3 className="authSemiHeading">Credit Card Information</h3>
      </div>
      <div
        className="d-grid gap-3 mt-4"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))" }}
      >
        <CustomInput
          label="Card Number"
          placeholder="Card Number"
          value={values.cardNumber}
          onChange={(e) => handleInputChange(e, "cardNumber")}
          lineColor="green"
        />
        <CustomInput
          label="Expiry Date"
          placeholder="Expiry Date"
          value={values.expiryDate}
          onChange={(e) => handleInputChange(e, "expiryDate")}
        />
        <CustomInput
          label="CVV"
          placeholder="CVV"
          value={values.cvv}
          onChange={(e) => handleInputChange(e, "cvv")}
        />
        <CustomInput
          label="Cardholder Name"
          placeholder="Cardholder Name"
          value={values.cardholderName}
          onChange={(e) => handleInputChange(e, "cardholderName")}
        />
      </div>
      <div className="d-flex justify-content-center gap-3 mt-5">
        <Button onClick={prevStep} type="secondary">
          Back
        </Button>
        <Button customClass="white-text-force" onClick={handleSubmit}>
          Register
        </Button>
      </div>
    </div>
  );
};

export default BankingDetails;
