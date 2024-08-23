import { useGetLoginResponseDTO } from "@/hooks/useGetLoginResponseDTO";
import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface AuthCheckerProps {
  children: ReactNode;
}
export const AuthChecker = ({ children }: AuthCheckerProps) => {
  const token = useGetLoginResponseDTO()?.token;
  return token ? <div>{children}</div> : <Navigate to="/auth/login" />;
};
