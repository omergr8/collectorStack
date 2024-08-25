import React from "react";
import styles from "./SignupWizard.module.css";
import CustomInput from "@/components/CustomInput";
import Button from "@/components/Button";
import Link from "next/link";
import { registerText } from "@/constants/constants";
import { CreateAccountProps } from "@/constants/types";
import { authText } from "@/constants/constants";

const CreateAccount: React.FC<CreateAccountProps> = ({
  handleSubmit,
  handleInputChange,
  values,
  errors,
  loading,
}) => {
  return (
    <div>
      <h3 className={`authTitle`}>{registerText.title1}</h3>
      <p className={`authSmallerText`}>{registerText.info1}</p>
      <div className="d-grid authGridTemplate mt-5 gap-3">
        <CustomInput
          label="First Name"
          placeholder="First Name"
          value={values.firstName}
          onChange={(e) => handleInputChange(e, "firstName")}
          lineColor="green"
          error={errors.firstName}
        />

        <CustomInput
          label="Last Name"
          placeholder="Last Name"
          value={values.lastName}
          onChange={(e) => handleInputChange(e, "lastName")}
          lineColor="green"
          error={errors.lastName}
        />

        <CustomInput
          label="Email"
          placeholder="Email"
          value={values.email}
          onChange={(e) => handleInputChange(e, "email")}
          error={errors.email}
        />

        <CustomInput
          label="Username"
          placeholder="Username"
          value={values.username}
          onChange={(e) => handleInputChange(e, "username")}
          error={errors.username}
        />

        <CustomInput
          label="Password"
          placeholder="Password"
          type="password"
          value={values.password}
          onChange={(e) => handleInputChange(e, "password")}
          error={errors.password}
        />

        <CustomInput
          label="Repeat Password"
          placeholder="Repeat Password"
          type="password"
          value={values.repeatPassword}
          onChange={(e) => handleInputChange(e, "repeatPassword")}
          error={errors.repeatPassword}
        />
      </div>
      <div className="d-flex justify-content-center gap-3 mt-5">
        <Button
          customClass="white-text-force"
          onClick={handleSubmit}
          loading={loading}
          disabled={loading}
        >
          Register
        </Button>
      </div>
      <hr className="dotted-line" />
      <p className={`authSmallerText`}>
        {authText.have}{" "}
        <Link href="/login" className={styles.login}>
          <span>log in</span>
        </Link>
      </p>
    </div>
  );
};

export default CreateAccount;
