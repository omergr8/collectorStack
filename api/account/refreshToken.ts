import axios from "axios";
import { API_BASE_URL } from "../axiosInstance";
import { RefreshTokenResponse } from "@/constants/types";

export const refreshToken = async (
  refreshToken: string
): Promise<RefreshTokenResponse> => {
  const response = await axios.post(`${API_BASE_URL}/account/token/refresh/`, {
    refresh: refreshToken,
  });
  return response.data;
};
