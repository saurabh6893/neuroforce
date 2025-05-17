import { useState, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import AuthProvider, { AuthContext } from "./Context/AuthProvider";

import { ROUTES } from "./constants/routes";
import { Employee, Admin } from "./types";
import Login from "./Components/Auth/Login";
import AdminDashBoard from "./Components/Dashboard/AdminDashBoard";
import EmployeeDashboard from "./Components/Dashboard/EmployeeDashboard";

const App = () => {
  const [data, setData] = useState<Employee | Admin | null>(null);
  const authData = useContext(AuthContext);

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );
      const { token, role, fullName } = response.data;
      authData?.setToken?.(token);
      authData?.setUser?.(role);
      localStorage.setItem("token", token);
      setData({
        email,
        fullName,
        role,
        id: Date.now(),
        _id: response.data.userId,
      });
    } catch (error) {
      console.error("Login error:", error);
      throw new Error("Login failed");
    }
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={ROUTES.LOGIN}
            element={<Login handleLogin={handleLogin} />}
          />
          <Route
            path={ROUTES.ADMIN_HOME}
            element={<AdminDashBoard data={data} />}
          />
          <Route
            path="/employee/:fullName/home"
            element={<EmployeeDashboard data={data} />}
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
