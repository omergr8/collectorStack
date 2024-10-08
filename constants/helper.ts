import { grades } from "./constants";
import { Grade } from "./types";

export const percentageCalculator = (
  collectedCardCount: number,
  cardCount: number
) => {
  if (cardCount === 0) {
    return 0; // Avoid division by zero
  }

  return Math.round((100 * collectedCardCount) / cardCount);
};

export const getGradeDetails = (grade: number) => {
  if (grades[grade as Grade]) {
    return grades[grade as Grade];
  } else if (grade % 1 === 0.5 && grade !== 1.5) {
    const baseGrade = Math.floor(grade) as Grade;
    const baseDetails = grades[baseGrade];
    return {
      text: baseDetails.text + "+",
      abbreviation: baseDetails.abbreviation + "+",
      icon: baseDetails.icon,
    };
  } else {
    return { text: "", abbreviation: "", icon: null };
  }
};

export const formatErrorMessages = (err: any): string => {
  if (typeof err === "string") {
    return err; // If the error is a string, return it directly
  }

  if (err && typeof err === "object") {
    // Handle object error
    if (err.message) {
      return err.message; // Use the message field if it exists
    }

    // If the object contains other properties, format them
    return JSON.stringify(err, null, 2); // Convert the error object to a readable string
  }

  return "An unexpected error occurred";
};

export const transformFiltersToQueryParams = (filters: any) => {
  return filters.reduce((params: any, filter: any) => {
    const { filterName, values } = filter;

    const uniqueValues: string[] = [];

    if (Array.isArray(values)) {
      values.forEach((value) => {
        // Check if the value is a string and split it if applicable
        if (typeof value === "string") {
          value.split("|").forEach((v: any) => {
            if (!uniqueValues.includes(v)) {
              uniqueValues.push(v);
            }
          });
        } else if (typeof value === "number") {
          // Convert numbers to strings and add them to the uniqueValues array
          const numStr = value.toString();
          if (!uniqueValues.includes(numStr)) {
            uniqueValues.push(numStr);
          }
        }
      });
    }

    if (uniqueValues.length > 0) {
      params[filterName] = uniqueValues.join(",");
    } else {
      params[filterName] = "";
    }

    return params;
  }, {});
};
