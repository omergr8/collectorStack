import axiosInstance from "../axiosInstance";
import { AxiosResponse } from "axios";
import { FetchPlayerByQueryParams } from "@/constants/types";

export const player = {
  getAll: async (params: FetchPlayerByQueryParams): Promise<any> => {
    const { q, sportstype, page, page_size } = params;

    try {
      const response: AxiosResponse<any> = await axiosInstance.get(
        `/core/player/`,
        {
          params: {
            q,
            sportstype,
            page,
            page_size,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch players by query"
      );
    }
  },

  get: async (id: number): Promise<any> => {
    try {
      const response: AxiosResponse<any> = await axiosInstance.get(
        `/core/player/${id}/`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch player details"
      );
    }
  },
};
