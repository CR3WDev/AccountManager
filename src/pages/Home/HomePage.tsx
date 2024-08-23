import { Topbar } from "@/components/Topbar";
import { Outlet } from "react-router-dom";
import { AuthChecker } from "./components/AuthChecker";

export const HomePage = () => {
  return (
    <AuthChecker>
      <Topbar />
      <Outlet />
    </AuthChecker>
  );
};
