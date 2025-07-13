import { useEffect } from "react";
import ReactPixel from "react-facebook-pixel";
import ReactGTM from "react-gtm-module";
import { useLocation } from "react-router-dom";

// Replace with your actual IDs
const GTM_ID = "GTM-ML9SMXPQ";
const FB_PIXEL_ID = "271604058979710";

// Define the global `dataLayer` type to avoid TypeScript errors
declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

const PageViewTracker: React.FC = () => {
  const location = useLocation();

  // Initialize GTM & Facebook Pixel
  useEffect(() => {
    ReactGTM.initialize({ gtmId: GTM_ID });
    ReactPixel.init(FB_PIXEL_ID);
    ReactPixel.pageView();
  }, []);

  // Trigger pageview tracking on every route change
  useEffect(() => {
    ReactPixel.pageView();
    window.dataLayer?.push({ event: "pageview" });
  }, [location]);

  return null;
};

export default PageViewTracker;
