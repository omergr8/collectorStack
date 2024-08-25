import toaster from "@/components/Toast/Toast";
import CustomToast from "@/components/CustomToast";

export const displayErrors = (errors: Record<string, string[] | string>) => {
  // Check if errors is an object with string keys
  if (typeof errors === "object") {
    if (Array.isArray(errors) || typeof errors === "string") {
      // Handle single string error message case
      toaster.error(errors, {
        autoClose: 5000,
      });
    } else {
      // Handle object with multiple error messages
      Object.keys(errors).forEach((key) => {
        const error = errors[key];
        if (Array.isArray(error)) {
          // If the value is an array of messages
          error.forEach((message) => {
            toaster.error(<CustomToast heading={key} text={message} />, {
              autoClose: 5000,
            });
          });
        } else if (typeof error === "string") {
          // If the value is a single error message
          toaster.error(<CustomToast heading={key} text={error} />, {
            autoClose: 5000,
          });
        }
      });
    }
  } else {
    // Handle the case where the input is not an object
    console.error("Invalid error format");
  }
};
