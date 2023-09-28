import React from "react";
import { useNavigate } from "react-router-dom";
type AuthProps = {
  children: React.ReactNode;
};

const Auth: React.FC<AuthProps> = ({ children }) => {
  const navigate = useNavigate();

  const user = document.cookie;
  console.log(user);
  // useAppSelector((state: any) => state.user.name);

  if (user) {
    navigate("/login");
  }

  return children;
};
export default Auth;
