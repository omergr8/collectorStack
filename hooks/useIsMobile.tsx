import { useEffect, useState } from 'react';

export const MOBILE_BREAKDOWN = 1000;

const useIsMobile = (): boolean => {
  const [width, setWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : MOBILE_BREAKDOWN + 1
  );

  useEffect(() => {
    // Ensure this runs only client-side
    if (typeof window !== 'undefined') {
      const handleWindowSizeChange = () => {
        setWidth(window.innerWidth);
      };

      // Set initial width immediately
      handleWindowSizeChange();

      // Add resize event listener
      window.addEventListener('resize', handleWindowSizeChange);

      // Clean up event listener on component unmount
      return () => {
        window.removeEventListener('resize', handleWindowSizeChange);
      };
    }
  }, []);

  return width <= MOBILE_BREAKDOWN;
};

export default useIsMobile;
