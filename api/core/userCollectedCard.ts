import axiosInstance from "../axiosInstance";
import { AxiosResponse } from "axios";
import {
  CollectedCardQueryParams,
  CollectedCardResponse,
  CollectedCardSummaryQueryParams,
  CollectedByCardSummaryResponse,
  CollectedCardSummaryResponse,
} from "@/constants/types";

export const userCollectedCard = (username: string) => ({
  getAll: async (
    queryParams: CollectedCardQueryParams
  ): Promise<CollectedCardResponse> => {
    try {
      const response: AxiosResponse<CollectedCardResponse> =
      await axiosInstance.get(`/core/user/${username}/collectedcard/`,{
        params: queryParams
      });
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch collected cards"
      );
    }
  },
  getByCardSetSummary: async (
    queryParams: CollectedCardSummaryQueryParams
  ): Promise<CollectedByCardSummaryResponse> => {
    try {
      const response: AxiosResponse<CollectedByCardSummaryResponse> =
        await axiosInstance.get(
          `/core/user/${username}/collectedcard/bycardset/summary/`,
          { params: queryParams }
        );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          "Failed to fetch collected card summary by card set"
      );
    }
  },
  fetchCollectedCardSummary:
    async (): Promise<CollectedCardSummaryResponse> => {
      try {
        const response: AxiosResponse<CollectedCardSummaryResponse> =
          await axiosInstance.get(
            `/core/user/${username}/collectedcard/summary/`
          );
        return response.data;
      } catch (error: any) {
        throw new Error(
          error.response?.data?.message ||
            "Failed to fetch collected card summary"
        );
      }
    },
  create: async (
    card: number,
    grade?: number | null,
    frontImage?: File | null,
    backImage?: File | null,
    isMarkedAsSold?: boolean,
    isWanted?: boolean
  ): Promise<any> => {
    try {
      const formData = new FormData();
      formData.append("card", card.toString());
      if (grade && grade !== undefined)
        formData.append("grade", grade.toString());
      if (isMarkedAsSold !== undefined)
        formData.append("is_marked_as_sold", isMarkedAsSold.toString());
      if (isWanted !== undefined)
        formData.append("is_wanted", isWanted.toString());
      if (frontImage) formData.append("front_image", frontImage);
      if (backImage) formData.append("back_image", backImage);

      const response: AxiosResponse<any> = await axiosInstance.post(
        `/core/user/${username}/collectedcard/`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to add collected card"
      );
    }
  },
  createCustom: async (
    title: string,
    frontImage: File | null,
    backImage: File | null,
    sportstype: string,
    grade?: number | null,
    cardset?: string,
    player?: string
  ): Promise<any> => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      if (frontImage) formData.append("front_image", frontImage);
      if (backImage) formData.append("back_image", backImage);
      formData.append("sportstype", sportstype);
      if (grade !== undefined && grade !== null)
        formData.append("grade", grade.toString());
      if (cardset) formData.append("cardset", cardset);
      if (player) formData.append("player", player);

      const response: AxiosResponse<any> = await axiosInstance.post(
        `/core/user/${username}/collectedcard/custom/`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to add custom collected card"
      );
    }
  },
});
