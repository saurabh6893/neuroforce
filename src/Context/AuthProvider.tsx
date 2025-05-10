import React, { createContext, useEffect, useState } from "react";
import { Admin, AuthContextType, Employee, UserRole } from "../types";
import { getLocalStorage, setLocalStorage } from "../utils/localStorage";

export const AuthContext = createContext<
  | (AuthContextType & {
      user: UserRole;
      setUser: React.Dispatch<React.SetStateAction<UserRole>>;
    })
  | null
>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // localStorage.clear();
  const [userData, setUserData] = useState<AuthContextType>({
    empData: [],
    adminData: [],
  });
  const [user, setUser] = useState<UserRole>("");

  useEffect(() => {
    if (!localStorage.getItem("Employee") || !localStorage.getItem("Admin")) {
      setLocalStorage();
    }

    const { empData, adminData }: { empData: Employee[]; adminData: Admin[] } =
      getLocalStorage();
    setUserData({ empData, adminData });
  }, []);

  return (
    <AuthContext.Provider value={{ ...userData, user, setUser }}>
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
