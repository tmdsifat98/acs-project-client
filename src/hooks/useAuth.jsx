import React, { useContext } from "react";
import AuthContext from "../providers/AuthContext";

const useAuth = () => {
  const useAuth = useContext(AuthContext);
  return useAuth;
};

export default useAuth;