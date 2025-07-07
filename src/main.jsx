import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./routes/router.jsx";
import { ThemeProvider } from "./providers/ThemeProvider.jsx";
import ContextProvider from "./providers/ContextProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const queryClient = new QueryClient()

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContextProvider>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ThemeProvider>
    </ContextProvider>
  </StrictMode>
);
