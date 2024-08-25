import axiosInstance from "../axiosInstance";
import { AxiosResponse } from "axios";

// Define the types for query parameters
interface CollectedCardQueryParams {
  manufacturer?: string[];
  page?: number;
  page_size?: number;
  player?: string;
  q?: string;
  sportstype?: string[];
  year?: number[];
  ordering?: string;
}

// Define the type for the response data
interface CollectedCardResponse {
  results: any[]; // Adjust this to match the actual response structure
  count: number;
  next?: string;
  previous?: string;
}

export const collectedCard = {
  getAll: async (
    queryParams: CollectedCardQueryParams
  ): Promise<CollectedCardResponse> => {
    try {
      const response: AxiosResponse<CollectedCardResponse> =
        await axiosInstance.get(`/core/collectedcard/`, {
          params: queryParams,
        });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to fetch cards");
    }
  },

  getLast: async (): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await axiosInstance.get(
        `/core/collectedcard/last/`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          "Failed to fetch the last collected card"
      );
    }
  },
};
