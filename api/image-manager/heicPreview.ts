import axiosInstance from "../axiosInstance";
import { AxiosResponse } from "axios";

export const heicPreview = () => ({
  create: async (
    image: File,
  ): Promise<any> => {
    try {
      const formData = new FormData();
      formData.append("image", image);
      
      const response: AxiosResponse<any> = await axiosInstance.post(
        `/image-manager/heic-preview/`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      return response.data.preview;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to get heic preview"
      );
    }
  },
  
});
