import axiosInstance from "../axiosInstance";
import { RegisterFormValues } from "@/constants/types";

export const signup = async (data: RegisterFormValues): Promise<void> => {
  try {
    await axiosInstance.post("/account/signup/", data);
  } catch (error: any) {
    throw error.response?.data || { general: ["Signup failed"] };
  }
};
