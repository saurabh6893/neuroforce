import { useEffect, useState } from "react";
import "./App.css";
import AdminDashBoard from "./Components/Dashboard/AdminDashBoard";
import Login from "./Components/Auth/Login";
import EmployeeDashboard from "./Components/Dashboard/EmployeeDashboard";

function App() {
  const [user, setUser] = useState("");

  const handleLogin = (email: string, password: string) => {
    if (email == "admin@example.com" && password == "adminpass") {
      setUser("Admin");
    } else if (email == "employee1@example.com" && password == "password123") {
      setUser("User");
    } else {
      alert("invalid Creds");
    }
  };

  return (
    <>
      {!user ? (
        <Login handleLogin={handleLogin} />
      ) : (
        (user === "User" && <EmployeeDashboard />) ||
        (user === "Admin" && <AdminDashBoard />)
      )}
    </>
  );
}

export default App;
