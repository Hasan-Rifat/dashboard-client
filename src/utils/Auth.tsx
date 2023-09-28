import React from "react";
import Login from "../pages/Login";
import { useAppSelector } from "../app/hooks";
type AuthProps = {
  children: React.ReactNode;
};

const Auth: React.FC<AuthProps> = ({ children }) => {
  const user = useAppSelector((state) => state.user);

  if (!user) {
    return <Login />;
  }

  return children;
};
export default Auth;
