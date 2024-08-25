"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Button from "@/components/Button";
import { routes } from "@/config/routes";

const ErrorContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const errorMessage = searchParams.get("message") || " We’re sorry, but something went wrong. Please try again later or return to the homepage.";

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100">
      <div className="text-center">
        <div className="display-1 text-danger">Oops!</div>
        <h2 className="display-5">Something went wrong</h2>
        <p className="lead">
          {errorMessage}
        </p>
        <Button
          customClass="white-text-force m-auto"
          onClick={() => router.push(routes.home)}
        >
          Go to Homepage
        </Button>
      </div>
    </div>
  );
};

const ErrorPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorContent />
    </Suspense>
  );
};

export default ErrorPage;
