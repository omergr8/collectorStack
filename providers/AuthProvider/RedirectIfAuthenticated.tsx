import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import OverlayLoader from "@/components/OverlayLoader";
import { routes } from "@/config/routes";

const RedirectIfAuthenticated = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const Wrapper: React.FC<P> = (props) => {
    const { isAuthenticated, loading, loadingPercentage } = useAuth();
    const router = useRouter();

    React.useEffect(() => {
      if (!loading && isAuthenticated) {
        router.push(routes.core.dashboard); // Redirect to home if authenticated
      }
    }, [isAuthenticated, loading, router]);

    // Show a loading indicator while loading or if authenticated
    if (loading || isAuthenticated) {
      return <OverlayLoader text={loadingPercentage} />; // You can replace this with a spinner or any other component
    }

    // Render the wrapped component if not authenticated
    return <WrappedComponent {...(props as P)} />;
  };

  return Wrapper;
};

export default RedirectIfAuthenticated;
