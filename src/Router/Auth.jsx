import React from "react";
import { Navigate } from "react-router";

const Auth = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  return user ? (
    user.user.role === "admin" ? (
      children
    ) : (
      <Navigate to="/login" />
    )
  ) : (
    <Navigate to="/login" />
  );
};

export default Auth;
