"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { verifyResetToken } from "@/api/account/resetPassword/verifyToken";
import { resetPassword } from "@/api/account/resetPassword/resetPassword";
import CustomInput from "@/components/CustomInput";
import Button from "@/components/Button";
import toaster from "@/components/Toast/Toast";
import AuthBox from "@/components/AuthBox";
import styles from "./ResetPasswordForm.module.css";
import { displayErrors } from "@/constants/errorHelper";
import OverlayLoader from "@/components/OverlayLoader";
import { resetTokenErrorMessage } from "@/constants/constants";

export interface ResetPasswordProps {
  token: string | null;
}

const ResetPasswordForm: React.FC<ResetPasswordProps> = ({ token }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | undefined>(
    undefined
  );
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | undefined
  >(undefined);

  useEffect(() => {
    // Handle cases where the token is missing
    if (!token) {
      toaster.error("Token is missing or invalid");
      router.push(`/error?message=Missing or invalid token`);
      return;
    }

    // Verify the token when the page loads
    const verifyToken = async () => {
      try {
        if (token) {
          await verifyResetToken(token);
          setIsTokenValid(true);
          toaster.success("Token verified successfully");
        }
      } catch (error) {
        // Redirect to an error page if the token is invalid
        toaster.error("Invalid token");
        router.push(`/error?message=${resetTokenErrorMessage}`);
      }
    };

    verifyToken();
  }, [token, router]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordError(undefined);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordError(undefined);
  };

  const handlePasswordReset = async () => {
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      await resetPassword(token as string, password, confirmPassword);
      toaster.success("Password has been reset successfully.");
      router.push("/login");
    } catch (err: any) {
      if (err && typeof err === "object" && !Array.isArray(err)) {
        // Assuming err is the error object with multiple messages
        displayErrors(err);
      } else {
        toaster.error("Unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  if (isTokenValid === null) {
    // While verifying the token, you can show a loading spinner or placeholder
    return <OverlayLoader />;
  }

  if (!isTokenValid) {
    // The redirection will happen in the `useEffect`, so no need to handle anything here.
    return null;
  }

  // Render the reset password form only if the token is valid
  return (
    <div>
      <AuthBox>
        <div className={styles.box}>
          <h3 className="authTitle">
            <span className={styles.spanText}>Reset </span> Your Password
          </h3>
          <p className="authSmallerText">Please enter a new password below.</p>
          <div className="mt-5 mb-4">
            <CustomInput
              label="New Password"
              placeholder="Enter new password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              error={passwordError}
            />
            <CustomInput
              label="Confirm Password"
              placeholder="Confirm your password"
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              error={confirmPasswordError}
            />
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <Button
              onClick={handlePasswordReset}
              customClass="white-text-force"
              loading={loading}
              disabled={loading}
            >
              Reset Password
            </Button>
          </div>
        </div>
      </AuthBox>
    </div>
  );
};

export default ResetPasswordForm;
