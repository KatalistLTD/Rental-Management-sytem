import { ThemeProvider } from "@/contexts/theme-context";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import LandlordPage from "@/routes/dashboard/landlordPage";
import LandlordProperties from "@/routes/pages/LandlordProperties";
import Invoices from "./routes/pages/Invoices";
import LandlordMaintenance from "./routes/pages/LandlordMaintenance";
import LandlordSettings from "./routes/pages/LandlordSettings";
import LandlordTenants from "./routes/pages/LandlordTenants";
import PaymentIntegration from "./routes/pages/PaymentIntegration";
import Payments from "./routes/pages/Payments";
import Reports from "./routes/pages/Reports";

import Layout from "@/routes/layout";
import TenantPage from "./routes/dashboard/tenantPage";
import TenantLayout from "./routes/tenantLayout";

import HomePage from "./routes/HomePage";
import Login from "./routes/pages/Login";
import Signup from "./routes/pages/Signup";
// import Profile from "./routes/pages/Profile";

const router = createBrowserRouter(
  [
    { path: "/", element: <HomePage /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },

    // Protected Routes for Landlords
    {
      path: "/landlord",
      element: <ProtectedRoute allowedRoles={["Landlord"]} />,
      children: [
        {
          path: "",
          element: <Layout />,
          children: [
            { index: true, element: <LandlordPage /> },
            { path: "property-management", element: <LandlordProperties /> },
            { path: "tenant-management", element: <LandlordTenants /> },
            // { path: "profile", element: <Profile /> },
            
            { path: "maintenance", element: <LandlordMaintenance /> },
            { path: "invoice", element: <Invoices /> },
            { path: "reports", element: <Reports /> },
            { path: "payment-integration", element: <PaymentIntegration /> },
            { path: "settings", element: <LandlordSettings /> },
          ],
        },
      ],
    },

    // Protected Routes for Tenants
    {
      path: "/tenant",
      element: <ProtectedRoute allowedRoles={["Tenant"]} />,
      children: [
        {
          path: "",
          element: <TenantLayout />,
          children: [
            { index: true, element: <TenantPage /> },
            { path: "property-management", element: <LandlordProperties /> },
            // { path: "profile", element: <Profile /> },
            { path: "payments", element: <Payments /> },
            { path: "tenant-management", element: <LandlordTenants /> },
            { path: "reports", element: <Reports /> },
            { path: "settings", element: <h1 className="title">Settings</h1> },
          ],
        },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
);

function App() {
  return (
    <ThemeProvider storageKey="theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
