import { useContext, useEffect, useState, useCallback } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { AuthContext } from "./Context/AuthProvider";
import Login from "./Components/Auth/Login";
import AdminDashBoard from "./Components/Dashboard/AdminDashBoard";
import EmployeeDashboard from "./Components/Dashboard/EmployeeDashboard";
import NotFound from "./Components/Common/NotFound";
import { Admin, Employee } from "./types";
import "./App.css";
import { ROUTES } from "./constants/routes";
import ErrorBoundary from "./Components/Common/ErrorBoundary";
import { isTokenExpired } from "./utils/auth";
import { useNavigationBlocker } from "./hooks/ useNavigationBlocker";

function App() {
  const authData = useContext(AuthContext);
  const [loggedUserData, setLoggedUserData] = useState<Employee | Admin | null>(
    null
  );
  const navigate = useNavigate();

  useNavigationBlocker(
    authData?.user === undefined ||
      (!!localStorage.getItem("authToken") &&
        isTokenExpired(localStorage.getItem("authToken")!))
  );

  useEffect(() => {
    const initializeAuth = () => {
      const loggedUser = localStorage.getItem("loggedUser");
      if (loggedUser) {
        const userData = JSON.parse(loggedUser);
        authData?.setUser(userData.role);
        setLoggedUserData(userData.data);
      }
    };
    initializeAuth();
  }, [authData]);

  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("loggedUser");

    if (!token || !storedUser || isTokenExpired(token)) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("loggedUser");
      authData?.setUser("");
      setLoggedUserData(null);
      navigate(ROUTES.LOGIN, { replace: true });
      return;
    }

    if (isTokenExpired(token)) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("loggedUser");
      authData?.setUser("");
      navigate(ROUTES.LOGIN, { replace: true });
      return;
    }

    try {
      const response = await fetch("/api/auth/check-auth", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Auth failed");

      const data = await response.json();
      setLoggedUserData((prev) => ({ ...prev, ...data.userData }));
    } catch (err) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("loggedUser");
      authData?.setUser("");
      navigate(ROUTES.LOGIN, { replace: true });
    }
  }, [navigate, authData]);

  useEffect(() => {
    checkAuth();
    const interval = setInterval(checkAuth, 30000);
    return () => clearInterval(interval);
  }, [checkAuth]);

  return (
    <Routes>
      <Route
        path={ROUTES.LOGIN}
        element={
          !authData?.user ? (
            <Login />
          ) : authData?.user === "admin" ? (
            <Navigate to={ROUTES.ADMIN_HOME} replace />
          ) : (
            <Navigate
              to={ROUTES.EMPLOYEE_HOME(
                (loggedUserData?.fullName || "").replace(/\s+/g, "-")
              )}
              replace
            />
          )
        }
      />

      <Route
        path={ROUTES.ADMIN_HOME}
        element={
          authData?.user === "admin" ? (
            <ErrorBoundary>
              <AdminDashBoard data={loggedUserData} />
            </ErrorBoundary>
          ) : (
            <Navigate to={ROUTES.LOGIN} replace />
          )
        }
      />

      <Route
        path={ROUTES.EMPLOYEE_HOME(":fullName")}
        element={
          authData?.user === "employee" ? (
            <EmployeeDashboard data={loggedUserData} />
          ) : (
            <Navigate to={ROUTES.LOGIN} replace />
          )
        }
      />

      <Route path="/" element={<Navigate to={ROUTES.LOGIN} replace />} />
      <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
    </Routes>
  );
}

export default App;
