import { createBrowserRouter } from 'react-router-dom';
import { AccountManagerPage } from '../pages/AccountManager/AccountManagerPage';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <AccountManagerPage />,
	},
]);
