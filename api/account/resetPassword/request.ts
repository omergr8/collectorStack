import axiosInstance from '@/api/axiosInstance';

export const requestPasswordReset = async (email: string): Promise<void> => {
  try {
    await axiosInstance.post("/account/reset-password/request/", { email });
  } catch (error: any) {
    console.log(error.response.data)
    throw new Error(error.response?.data?.message || "Failed to request password reset.");
  }
};
