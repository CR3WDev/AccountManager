import { createBrowserRouter } from 'react-router-dom';
import { AccountManagerPage } from '../pages/AccountManager/AccountManagerPage';
import { LoginPage } from '../pages/Login';
import { RegisterPage } from '../pages/Register';

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
		path: '/register',
		element: <RegisterPage />,
	},
]);
