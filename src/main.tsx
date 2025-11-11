import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { PropertyProvider } from "./context/PropertyContext.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { BlogProvider } from "./context/BlogContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <AuthProvider>
          <PropertyProvider>
            <BlogProvider>
              <App />
            </BlogProvider>
          </PropertyProvider>
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
