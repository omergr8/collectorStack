import axiosInstance from "../axiosInstance";
import { LoginResponse, LoginData } from "@/constants/types";

export const login = async (data: LoginData): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post("/account/login/", data);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { general: ["Login failed"] };
  }
};
