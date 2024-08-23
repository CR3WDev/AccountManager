import { createBrowserRouter } from "react-router-dom";

import { AccountManagerPage } from "@/pages/AccountManager/AccountManagerPage";
import { AuthHomePage } from "@/pages/AuthHome/AuthHomePage";
import { ChangePasswordPage } from "@/pages/ChangePassword/ChangePasswordPage";
import { HomePage } from "@/pages/Home/HomePage";
import { IntroductionPage } from "@/pages/Introduction/IntroductionPage";
import { LoginPage } from "@/pages/Login/LoginPage";
import { NewPasswordPage } from "@/pages/NewPassword/NewPasswordPage";
import { RegisterPage } from "@/pages/Register/RegisterPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <IntroductionPage />,
  },
  {
    path: "/",
    element: <HomePage />,
    children: [
      {
        path: "accountmanager",
        element: <AccountManagerPage />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthHomePage />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "changepassword",
        element: <ChangePasswordPage />,
      },
      {
        path: "newpassword",
        element: <NewPasswordPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
]);
