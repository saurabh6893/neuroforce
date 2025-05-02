import React, { createContext } from "react";

export const AuthContext = createContext("");

const AuthProvider = ({ children }: any) => {
  return (
    <AuthContext.Provider value={"saurabh"}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
