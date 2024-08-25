import axiosInstance from "../axiosInstance";
import { AxiosResponse } from "axios";

export const fetchFilters = async (): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await axiosInstance.get(
      `/core/card/filters/`
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch filters"
    );
  }
};
