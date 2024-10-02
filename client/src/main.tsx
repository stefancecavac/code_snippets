import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthContextProvider } from "./context/AuthContext.tsx";
import { ToastContextProvider } from "./context/ToastContext.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <ToastContextProvider>
          <App />
        </ToastContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  </StrictMode>
);
