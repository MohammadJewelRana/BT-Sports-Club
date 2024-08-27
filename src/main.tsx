import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import AuthProvider from "./provider/AuthProvider.tsx";
import { RouterProvider } from "react-router-dom";
import router from "./routes/route.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
   
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
      </AuthProvider>
    </QueryClientProvider>
    
  </React.StrictMode>
);
