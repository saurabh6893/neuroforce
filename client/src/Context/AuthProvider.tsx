import { createContext, useState, ReactNode } from "react";
import { AuthContextType, Task } from "../types";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [empData, setEmpData] = useState<AuthContextType["empData"]>([]);
  const [adminData, setAdminData] = useState<AuthContextType["adminData"]>([]);
  const [user, setUser] = useState<AuthContextType["user"]>("");
  const [token, setToken] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  return (
    <AuthContext.Provider
      value={{
        empData,
        adminData,
        user,
        setUser,
        token,
        setToken,
        tasks,
        setTasks,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

// when the app loads
// thr getLocalStorage pulls the initial data and feeds it to Local storage
// the extracted data is taken from Local storage
// and  is the then set as UserData
// userdata is passed to AuthContext
// auth context is availble to use across app

export default AuthProvider;
