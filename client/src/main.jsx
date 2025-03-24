import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import AuthProvider from "./contexts/AuthProvider"; // ✅ Import the provider
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      {" "}
      {/* ✅ Wrap the app with AuthProvider */}
      <App />
    </AuthProvider>
  </StrictMode>
);
