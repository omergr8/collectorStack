import axiosInstance from '@/api/axiosInstance';

export const resetPassword = async (token: string, password: string, passwordConfirmation: string): Promise<void> => {
  try {
    await axiosInstance.post("/account/reset-password/", {
      token,
      password,
      password2: passwordConfirmation,
    });
  } catch (error: any) {
    console.log(error.response.data)
    throw error.response?.data || { general: ["Failed to reset password."] };
  }
};
