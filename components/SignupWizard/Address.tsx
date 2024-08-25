import React from "react";
import CustomInput from "@/components/CustomInput";
import Button from "@/components/Button";
import { registerText } from "@/constants/constants";
import { AddressProps } from "@/constants/types";

const Address: React.FC<AddressProps> = ({
  nextStep,
  prevStep,
  handleInputChange,
  values,
}) => {
  return (
    <div>
      <h3 className={`authTitle`}>{registerText.title2}</h3>
      <p className={`authSmallerText`}>{registerText.info2}</p>

      <div className="d-grid authGridTemplate mt-5 gap-3">
        <CustomInput
          label="Street Address"
          placeholder="Street Address"
          value={values.streetAddress}
          onChange={(e) => handleInputChange(e, "streetAddress")}
          lineColor="green"
        />
        <CustomInput
          label="Province"
          placeholder="Province"
          value={values.province}
          onChange={(e) => handleInputChange(e, "province")}
          lineColor="green"
        />
        <CustomInput
          label="City"
          placeholder="City"
          value={values.city}
          onChange={(e) => handleInputChange(e, "city")}
        />
        <CustomInput
          label="Country"
          placeholder="Country"
          value={values.country}
          onChange={(e) => handleInputChange(e, "country")}
        />
        <CustomInput
          label="Zip/Postal Code"
          placeholder="Zip/Postal Code"
          value={values.zipCode}
          onChange={(e) => handleInputChange(e, "zipCode")}
        />
      </div>

      <div className="d-flex justify-content-center gap-3 mt-5">
        <Button onClick={prevStep} type="secondary">
          Back
        </Button>
        <Button customClass="white-text-force" onClick={nextStep}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default Address;
