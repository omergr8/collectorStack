"use client";
import React, { useState } from "react";
import AuthBox from "@/components/AuthBox";
import CustomInput from "@/components/CustomInput";
import Button from "@/components/Button/";
import { authText } from "@/constants/constants";
import styles from "./reset.module.css";
import { requestPasswordReset } from "@/api/account/resetPassword/request";
import toaster from "@/components/Toast/Toast";
import RedirectIfAuthenticated from "@/providers/AuthProvider/RedirectIfAuthenticated";
import { useSearchParams } from "next/navigation";
import ResetPasswordForm from "@/components/ResetPasswordForm";
const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState<string | undefined>(undefined);
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "email"
  ) => {
    if (type === "email") {
      setEmail(e.target.value);
      if (emailError) setEmailError(undefined); // Clear the error when user starts typing
    }
  };

  const handlePasswordResetRequest = async () => {
    if (!email) {
      setEmailError("Email is required");
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError("Invalid email format");
    } else {
      setLoading(true);
      try {
        await requestPasswordReset(email);
        toaster.success("Reset link has been sent");
      } catch (error) {
        toaster.error("Some error occured");
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return token !== null ? (
    <ResetPasswordForm token={token!}></ResetPasswordForm>
  ) : (
    <div>
      <AuthBox>
        <div className={styles.box}>
          <h3 className={`authTitle`}>
            <span className={styles.spanText}>Reset </span> {authText.reset}
          </h3>
          <p className={`authSmallerText`}>{authText.info}</p>
          <div className="mt-5 mb-4">
            <CustomInput
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => handleInputChange(e, "email")}
              error={emailError} // Pass error to CustomInput
            />
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <Button
              onClick={handlePasswordResetRequest}
              customClass="white-text-force"
              loading={loading}
              disabled={loading}
            >
              Reset Password
            </Button>
          </div>
          <hr className="dotted-line" />
        </div>
      </AuthBox>
    </div>
  );
};
export default RedirectIfAuthenticated(ResetPassword);
