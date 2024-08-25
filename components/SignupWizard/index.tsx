import React from "react";
import CreateAccount from "./CreateAccount";
import { SignupWizardProps } from "@/constants/types";

const SignupWizard: React.FC<SignupWizardProps> = ({
  step,
  values,
  errors,
  handleInputChange,
  handleSubmit,
  loading,
}) => {
  return (
    <>
      {(() => {
        switch (step) {
          case 1:
            return (
              <CreateAccount
                handleSubmit={handleSubmit}
                handleInputChange={handleInputChange}
                values={values}
                errors={errors}
                loading={loading}
              />
            );
          default:
            return <div>Unknown step</div>;
        }
      })()}
    </>
  );
};

export default SignupWizard;
