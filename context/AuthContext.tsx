"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useRef,
} from "react";
import { useRouter } from "next/navigation";
import { login as loginApi } from "@/api/account/login";
import { fetchUserProfile } from "@/api/account/profile";
import { fetchSportsType } from "@/api/core/sportsType";
import { collectedCard } from "@/api/core/collectedCard";
import { AuthContextProps } from "@/constants/types";
import { routes } from "@/config/routes";
import { displayErrors } from "@/constants/errorHelper";
import toaster from "@/components/Toast/Toast";

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [lastCard, setLastCard] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingPercentage, setLoadingPercentage] = useState<number>(0);
  const [sportstype, setSportstype] = useState<any[]>([]);
  const router = useRouter();
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      const initializeAuth = async () => {
        setLoadingPercentage(10);

        try {
          const type = await fetchSportsType();
          setSportstype(type);
          setLoadingPercentage(30);
        } catch (error) {
          console.error("Error fetching sports types:", error);
          toaster.error("Failed to load sports types. Please try again later.");
        }

        if (accessToken && refreshToken) {
          try {
            const profile = await fetchUserProfile();
            setUser(profile);
            const lastCollectedCard = await collectedCard.getLast();
            setLastCard(lastCollectedCard);
            setIsAuthenticated(true);
            setLoadingPercentage(70);
          } catch (error) {
            console.error("Error fetching user profile or last card:", error);
            toaster.error(
              "Failed to load your profile or last card. Please check your connection."
            );
            setIsAuthenticated(false);
            setUser(null);
            setLastCard(null);
          }
        }

        setLoadingPercentage(100);
        setLoading(false);
      };

      initializeAuth();
      isMounted.current = true;
    }
  }, []);

  const login = async (username: string, password: string) => {
    setLoading(true);
    setLoadingPercentage(10);

    try {
      const response = await loginApi({ username, password });
      const { access, refresh } = response;

      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
      setIsAuthenticated(true);
      setLoadingPercentage(50);

      const profile = await fetchUserProfile();
      setUser(profile);
      setLoadingPercentage(60);

      const lastCollectedCard = await collectedCard.getLast();
      setLastCard(lastCollectedCard);
      toaster.success("Login successful!");
      setLoadingPercentage(90);

      router.push(routes.core.dashboard);
    } catch (error: any) {
      if (error && typeof error === "object" && !Array.isArray(error)) {
        // Assuming error contains multiple messages
        displayErrors(error);
      } else {
        console.error("Error during login:", error);
        toaster.error(
          error.message || "An unknown error occurred. Please try again."
        );
      }
    } finally {
      setLoadingPercentage(100);
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsAuthenticated(false);
    setUser(null);
    setLastCard(null);
    router.push(routes.account.login);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated,
        loading,
        loadingPercentage,
        sportstype,
        lastCard
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
