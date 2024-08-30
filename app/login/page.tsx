"use client";
import React, { useState } from "react";
import Link from "next/link";
import AuthBox from "@/components/AuthBox";
import CustomInput from "@/components/CustomInput";
import Button from "@/components/Button/";
import { authText } from "@/constants/constants";
import styles from "./login.module.css";
import useAuth from "@/hooks/useAuth";
import RedirectIfAuthenticated from "@/providers/AuthProvider/RedirectIfAuthenticated";
import { routes } from "@/config/routes";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "username" | "password"
  ) => {
    if (type === "username") {
      setUsername(e.target.value);
    } else if (type === "password") {
      setPassword(e.target.value);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      await login(username, password);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.main}>
      <AuthBox>
        <h3 className={`authTitle`}>
          <span className={styles.spanText}>Hello, </span> {authText.title}
        </h3>
        <p className={`authSmallerText`}>{authText.info}</p>
        <div className="mt-4">
          <CustomInput
            label="Username"
            placeholder="Login"
            value={username}
            onChange={(e) => handleInputChange(e, "username")}
          />
          <CustomInput
            label="Password"
            placeholder="***************"
            value={password}
            type="Password"
            onChange={(e) => handleInputChange(e, "password")}
          />
        </div>
        {error && <p className="error">{error}</p>}
        <div className="d-flex flex-wrap-reverse align-items-center justify-content-center justify-content-md-between gap-4">
          <Button
            onClick={handleLogin}
            customClass="white-text-force"
            loading={loading}
            disabled={loading}
          >
            Login
          </Button>
          <Link href={routes.account.resetPassword} className="mx-2 authLink">
            <span className={`authSmallerText`}>{authText.forget}</span>
          </Link>
        </div>
        <hr className="dotted-line" />
        <p className={`authSmallerText`}>
          {authText.dont}{" "}
          <Link href={routes.account.signup} className={styles.register}>
            <span>Register</span>
          </Link>
        </p>
      </AuthBox>
    </div>
  );
};
export default RedirectIfAuthenticated(Login);
