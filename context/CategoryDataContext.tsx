"use client";
import React, { createContext, useContext, useState, useCallback } from "react";

interface CategoryDataContextType {
  data: Record<string, any[]>;
  fetchCategoryData: (category: string, fetchFunction: () => Promise<any[]>) => Promise<void>;
}

const CategoryDataContext = createContext<CategoryDataContextType | undefined>(undefined);

export const CategoryDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<Record<string, any[]>>({});

  const fetchCategoryData = useCallback(
    async (category: string, fetchFunction: () => Promise<any[]>) => {
      if (data[category]) return; // If data for this category is already present, don't fetch again.

      try {
        const fetchedData = await fetchFunction();
        setData((prevData) => ({
          ...prevData,
          [category]: fetchedData,
        }));
      } catch (error) {
        console.error(`Error fetching ${category} data:`, error);
      }
    },
    [data]
  );

  return (
    <CategoryDataContext.Provider value={{ data, fetchCategoryData }}>
      {children}
    </CategoryDataContext.Provider>
  );
};

export const useCategoryData = (): CategoryDataContextType => {
  const context = useContext(CategoryDataContext);
  if (!context) {
    throw new Error("useCategoryData must be used within a CategoryDataProvider");
  }
  return context;
};
