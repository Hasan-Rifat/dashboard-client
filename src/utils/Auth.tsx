import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Loading from "../components/shared/Loading";

// import { useAppSelector } from "../app/hooks";
type AuthProps = {
  children: React.ReactNode;
};

const Auth: React.FC<AuthProps> = ({ children }) => {
  // const user = useAppSelector((state) => state.user.role);
  const user = localStorage.getItem("accessToken");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate an async operation, like fetching data
    setTimeout(() => {
      setIsLoading(false); // Set isLoading to false when the operation is complete
    }, 2000); // Simulating a 2-second loading time
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (user) {
    return <>{children}</>;
  }

  return <Navigate to="/login" replace={true} />;
};
export default Auth;
