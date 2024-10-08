import { getLoginResponseDTO } from "@/utils/getLoginResponseDTO";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface AuthCheckerProps {
  children: ReactNode;
}
export const AuthChecker = ({ children }: AuthCheckerProps) => {
  const token = getLoginResponseDTO();
  console.log({token});
  return token ? <div>{children}</div> : <Navigate to="/auth/login" />;
};
