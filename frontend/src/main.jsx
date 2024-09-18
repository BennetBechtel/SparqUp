import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClientProvider, QueryClient } from "react-query";
import { NavContextProvider } from "./contexts/NavContext.jsx";
import { AuthContextProvider } from "./contexts/AuthContext.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <NavContextProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </NavContextProvider>
    </QueryClientProvider>
  </StrictMode>,
);
