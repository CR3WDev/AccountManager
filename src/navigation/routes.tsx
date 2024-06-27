import { createBrowserRouter } from 'react-router-dom';

import { AccountManagerPage } from '@/pages/AccountManager/AccountManagerPage';
import { ChangePasswordPage } from '@/pages/ChangePassword/ChangePasswordPage';
import { LoginPage } from '@/pages/Login/LoginPage';
import { NewPasswordPage } from '@/pages/NewPassword/NewPasswordPage';
import { RegisterPage } from '@/pages/Register/RegisterPage';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <AccountManagerPage />,
	},
	{
		path: '/login',
		element: <LoginPage />,
	},
	{
		path: '/changepassword',
		element: <ChangePasswordPage />,
	},
	{
		path: '/newpassword',
		element: <NewPasswordPage />,
	},
	{
		path: '/register',
		element: <RegisterPage />,
	},
]);
