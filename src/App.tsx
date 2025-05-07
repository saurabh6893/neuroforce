import { useContext, useEffect, useState } from "react";
import "./App.css";
import AdminDashBoard from "./Components/Dashboard/AdminDashBoard";
import Login from "./Components/Auth/Login";
import EmployeeDashboard from "./Components/Dashboard/EmployeeDashboard";
import { AuthContext } from "./Context/AuthProvider";
import { Admin, Employee, UserRole } from "./types";

function App() {
  const [user, setUser] = useState<UserRole>("");
  const authData = useContext(AuthContext);
  const [loggerUserData, setLoggedUserData] = useState<Employee | Admin | null>(
    null
  );

  useEffect(() => {
    const loggedUser = localStorage.getItem("loggedUser");
    if (loggedUser) {
      const userData = JSON.parse(loggedUser);
      setUser(userData.role);
      setLoggedUserData(userData.data);
    }
  }, []);

  const handleLogin = (email: string, password: string) => {
    if (email === "admin@example.com" && password === "adminpass") {
      const admin = authData?.adminData?.[0];
      setUser("Admin");
      admin && setLoggedUserData(admin);
      localStorage.setItem(
        "loggedUser",
        JSON.stringify({ role: "Admin", data: admin })
      );
    } else if (authData) {
      const employee = authData.empData.find(
        (e) => email === e.email && e.password === password
      );

      // employee is just the employee data from the data storred in local storage aka specific employee from list of data we created

      if (employee) {
        setUser("Employee");
        setLoggedUserData(employee);
        localStorage.setItem(
          "loggedUser",
          JSON.stringify({ role: "Employee", data: employee })
        );
      }
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <>
      {!user ? <Login handleLogin={handleLogin} /> : ""}
      {user == "Admin" ? (
        <AdminDashBoard data={loggerUserData} />
      ) : user == "Employee" ? (
        <EmployeeDashboard data={loggerUserData} />
      ) : null}
      ;
    </>
  );
}
export default App;
