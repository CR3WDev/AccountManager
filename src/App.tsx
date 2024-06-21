import 'primereact/resources/themes/tailwind-light/theme.css';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from './navigation/routes';

const App = () => {
	return (
		<>
			<RouterProvider router={router} />
		</>
	);
};

export default App;
