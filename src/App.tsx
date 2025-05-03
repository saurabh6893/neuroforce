import { useContext, useEffect, useState } from "react";
import "./App.css";
import AdminDashBoard from "./Components/Dashboard/AdminDashBoard";
import Login from "./Components/Auth/Login";
import EmployeeDashboard from "./Components/Dashboard/EmployeeDashboard";
import { AuthContext } from "./Context/AuthProvider";
import { Employee, UserRole } from "./types";

function App() {
  const [user, setUser] = useState<UserRole>("");
  const authData = useContext(AuthContext);
  // So auth data data is basically userdata from AuthProvider
  const [loggerUserData, setLoggedUserData] = useState<Employee | null>(null);
  // useEffect(() => {
  //   if (authData) {
  //     const loggedUser: any = localStorage.getItem("loggedUser");
  //     if (loggedUser) {
  //       setUser(loggedUser.role);
  //     }
  //   }
  // }, [authData]);

  const handleLogin = (email: string, password: string) => {
    if (email === "admin@example.com" && password === "adminpass") {
      setUser("Admin");
      localStorage.setItem("loggedUser", JSON.stringify({ role: "Admin" }));
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
          JSON.stringify({ role: "Employee" })
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
        <AdminDashBoard />
      ) : user == "Employee" ? (
        <EmployeeDashboard data={loggerUserData} />
      ) : null}
      ;
    </>
  );
}
export default App;
