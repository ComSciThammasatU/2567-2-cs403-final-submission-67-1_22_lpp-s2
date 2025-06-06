import { useEffect, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  BrowserRouter,
  useNavigate,
} from "react-router-dom";

import Login from "@/pages/Login/Login";
import { useAuthStore } from "@/stores/authStore";

import { userRoutes } from "@/routes/userRoutes";
import UserLayout from "./layouts/UserLayout/UserLayout";

import { approvalRoutes } from "./routes/approvalRoutes";
import ApprovalLayout from "./layouts/ApprovalLayout/ApprovalLayout";

function App() {
  const authStore = useAuthStore((state) => state);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const isValid = authStore.verifyToken();
    setAuthChecked(true); // only call this once
  }, []);

  if (!authChecked) return <div>Loading...</div>;

  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root based on role */}
        {authStore.isLoggingIn && (
          <Route
            path="/"
            element={
              authStore.role === "approval" ? (
                <Navigate to="/approval" />
              ) : (
                <Navigate to="/user" />
              )
            }
          />
        )}

        {!authStore.isLoggingIn && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<Navigate to="/login" />} />
          </>
        )}

        {authStore.isLoggingIn && authStore.role === "approval" && (
          <Route path="/approval" element={<ApprovalLayout />}>
            {approvalRoutes.map((r) => (
              <Route
                key={r.path}
                path={r.path.replace("/approval/", "")}
                element={r.element}
              />
            ))}
          </Route>
        )}

        {authStore.isLoggingIn && authStore.role === "user" && (
          <Route path="/user" element={<UserLayout />}>
            {userRoutes.map((r) => (
              <Route
                key={r.path}
                path={r.path.replace("/user/", "")}
                element={r.element}
              />
            ))}
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
