"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import RedirectIfAuthenticated from "@/providers/AuthProvider/RedirectIfAuthenticated";

import { signup } from "@/api/account/signup";
import { routes } from "@/config/routes";

import AuthBox from "@/components/AuthBox";
import SignupWizard from "@/components/SignupWizard";
import toaster from "@/components/Toast/Toast";
import CustomToast from "@/components/CustomToast";

import { RegisterFormValues } from "@/constants/types";
import { displayErrors } from "@/constants/errorHelper";

const Signup = () => {
  const router = useRouter();
  const [step, setStep] = useState<number>(1);
  const [values, setValues] = useState<RegisterFormValues>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    username: "",
    password: "",
    repeatPassword: "",
    streetAddress: "",
    province: "",
    city: "",
    country: "",
    zipCode: "",
    billingStreetAddress: "",
    billingProvince: "",
    billingCity: "",
    billingCountry: "",
    billingZipCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  const validateStep = () => {
    let newErrors: { [key: string]: string } = {};

    if (step === 1) {
      if (!values.firstName) newErrors.firstName = "First name is required";
      if (!values.lastName) newErrors.lastName = "Last name is required";
      if (!values.email) newErrors.email = "Email is required";
      if (!values.username) newErrors.username = "Username is required";
      if (!values.password) newErrors.password = "Password is required";
      if (!values.repeatPassword)
        newErrors.repeatPassword = "Repeat password is required";
      if (values.password !== values.repeatPassword)
        newErrors.repeatPassword = "Passwords do not match";
      if (!/^(?=.*[a-zA-Z])(?=.*[0-9])/.test(values.password))
        newErrors.password = "Password must be alphanumeric";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setValues({
      ...values,
      [field]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      if (validateStep()) {
        setLoading(true);
        const transformedValues = {
          ...values,
          username: values.username,
          password: values.password,
          password2: values.repeatPassword,
          email: values.email,
          first_name: values.firstName,
          last_name: values.lastName,
        };

        await signup(transformedValues);
        toaster.success("Signup successful");
        // Redirect to the login page after successful signup
        router.push(routes.account.login);
      }

      // Handle successful signup, redirect, etc.
    } catch (err: any) {
      if (err && typeof err === "object" && !Array.isArray(err)) {
        // Assuming err is the error object with multiple messages
        displayErrors(err);
      } else {
        console.log("error:", err);
        toaster.error("Unknown Error occured");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex container-95 align-items-center">
      <AuthBox>
        <SignupWizard
          step={step}
          values={values}
          errors={errors}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          loading={loading}
        />
      </AuthBox>
    </div>
  );
};

export default RedirectIfAuthenticated(Signup);
