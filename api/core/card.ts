import axiosInstance from "../axiosInstance";
import { AxiosResponse } from "axios";

export const card = {
  getAll: async (queryParams: string): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await axiosInstance.get(
        `/core/card/`,
        {
          params: {
            q: queryParams,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to fetch cards");
    }
  },
  get: async (cardId: string): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await axiosInstance.get(
        `/core/card/${cardId}/`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to fetch card");
    }
  },
};
