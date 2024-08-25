import axiosInstance from "../axiosInstance";
import { AxiosResponse } from "axios";
import { FetchCardsetByQueryParams } from "@/constants/types";

export const cardSet = {
    getAll: async (params: FetchCardsetByQueryParams): Promise<any> => {
        const { q, sportstype, page, page_size } = params;

        try {
            const response: AxiosResponse<any> = await axiosInstance.get(
                `/core/cardset/`,
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
                error.response?.data?.message || "Failed to fetch card set by query"
            );
        }
    },
};
