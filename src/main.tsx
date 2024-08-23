import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { Interceptor } from "./api/components/interceptor.tsx";
import { queryClient } from "./api/queryClient.ts";
import App from "./App.tsx";
import { GlobalToast } from "./components/GlobalToast.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Interceptor>
        <App />
      </Interceptor>
    </QueryClientProvider>
    <GlobalToast />
  </React.StrictMode>
);
