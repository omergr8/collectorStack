import axiosInstance from '@/api/axiosInstance';
import { VerifyTokenResponse } from "@/constants/types";

export const verifyResetToken = async (token: string): Promise<VerifyTokenResponse> => {
  try {
    const response = await axiosInstance.post("/account/reset-password/token/verify/", { token });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to verify reset token.");
  }
};
