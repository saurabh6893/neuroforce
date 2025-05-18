import React, { createContext, useEffect, useState } from "react";

import { getLocalStorage, setLocalStorage } from "../utils/localStorage";
import { AuthContextType, UserRole } from "../types";

export const AuthContext = createContext<
  | (AuthContextType & {
      user: UserRole;
      setUser: React.Dispatch<React.SetStateAction<UserRole>>;
      loginWithBackend: (email: string, password: string) => Promise<void>;
    })
  | null
>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = useState<AuthContextType>({
    empData: [],
    adminData: [],
  });
  const [user, setUser] = useState<UserRole>("");

  useEffect(() => {
    // localStorage.clear();
    if (!localStorage.getItem("Employee") || !localStorage.getItem("Admin")) {
      setLocalStorage();
    }

    const { empData, adminData } = getLocalStorage();
    setUserData({ empData, adminData });
  }, []);

  // Extracting existing auth logic into a reusable function
  const handleLocalAuth = (email: string, password: string) => {
    if (email === "admin@example.com" && password === "adminpass") {
      const admin = userData.adminData?.[0];
      if (admin) {
        setUser("Admin");
        localStorage.setItem(
          "loggedUser",
          JSON.stringify({ role: "Admin", data: admin })
        );
      }
    } else {
      const employee = userData.empData.find(
        (e) => email === e.email && e.password === password
      );

      if (employee) {
        setUser("Employee");
        localStorage.setItem(
          "loggedUser",
          JSON.stringify({ role: "Employee", data: employee })
        );
      } else {
        alert("Invalid credentials");
      }
    }
  };

  const loginWithBackend = async (email: string, password: string) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error("Auth failed");

      const data = await response.json();
      localStorage.setItem("authToken", data.token);
      localStorage.setItem(
        "loggedUser",
        JSON.stringify({
          role: data.role,
          data: data.userData,
        })
      );
      setUser(data.role);
    } catch (err) {
      // this is for Fallback to local storage auth
      handleLocalAuth(email, password);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...userData,
        user,
        setUser,
        loginWithBackend,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

// when the app loads
// thr getLocalStorage pulls the initial data and feeds it to Local storage
// the extracted data is taken from Local storage
// and  is the then set as UserData
// userdata is passed to AuthContext
// auth context is availble to use across app
