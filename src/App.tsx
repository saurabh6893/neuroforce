import { useContext, useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "./Context/AuthProvider";
import Login from "./Components/Auth/Login";
import AdminDashBoard from "./Components/Dashboard/AdminDashBoard";
import EmployeeDashboard from "./Components/Dashboard/EmployeeDashboard";
import NotFound from "./Components/Common/NotFound";
import { Admin, Employee } from "./types";
import "./App.css";
import { ROUTES } from "./constants/routes";

function App() {
  const authData = useContext(AuthContext);
  const [loggerUserData, setLoggedUserData] = useState<Employee | Admin | null>(
    null
  );
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUser = localStorage.getItem("loggedUser");
    if (loggedUser) {
      const userData = JSON.parse(loggedUser);
      authData?.setUser(userData.role);
      setLoggedUserData(userData.data);
    }
  }, [authData?.user]);

  const handleLogin = (email: string, password: string) => {
    if (email === "admin@example.com" && password === "adminpass") {
      const admin = authData?.adminData?.[0];
      if (admin) {
        authData?.setUser("Admin");
        setLoggedUserData(admin);
        localStorage.setItem(
          "loggedUser",
          JSON.stringify({ role: "Admin", data: admin })
        );
        navigate(ROUTES.ADMIN_HOME);
      }
    } else if (authData) {
      const employee = authData.empData.find(
        (e) => email === e.email && e.password === password
      );

      if (employee) {
        authData.setUser("Employee");
        setLoggedUserData(employee);
        localStorage.setItem(
          "loggedUser",
          JSON.stringify({ role: "Employee", data: employee })
        );
        navigate(ROUTES.EMPLOYEE_HOME(employee.fullName));
      } else {
        alert("Invalid credentials");
      }
    }
  };

  return (
    <Routes>
      <Route
        path={ROUTES.LOGIN}
        element={
          !authData?.user ? (
            <Login handleLogin={handleLogin} />
          ) : authData.user === "Admin" ? (
            <Navigate to="/admin/home" />
          ) : (
            <Navigate
              to={`/employee/${loggerUserData?.fullName?.replace(
                /\s+/g,
                "-"
              )}/home`}
            />
          )
        }
      />

      <Route
        path={ROUTES.ADMIN_HOME}
        element={
          authData?.user === "Admin" ? (
            <AdminDashBoard data={loggerUserData} />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route
        path={ROUTES.EMPLOYEE_HOME(":fullName")}
        element={
          authData?.user === "Employee" ? (
            <EmployeeDashboard data={loggerUserData} />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route path="/" element={<Navigate to="/login" />} />
      <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
    </Routes>
  );
}

export default App;
