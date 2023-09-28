import React from "react";
import { useAppSelector } from "../app/hooks";
import { useNavigate } from "react-router-dom";
type AuthProps = {
  children: React.ReactNode;
};

const Auth: React.FC<AuthProps> = ({ children }) => {
  const navigate = useNavigate();
  const user = useAppSelector((state: any) => state.user.name);

  if (!user) {
    navigate("/login");
  }

  return children;
};
export default Auth;
