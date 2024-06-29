import bgImg from '@/assets/bgimg2.svg';
import { Outlet } from 'react-router-dom';
export const AuthHomePage = () => {
	return (
		<div className="flex h-screen">
			<div
				className="flex justify-content-center align-items-center bg-primary"
				style={{
					width: 'calc(60vw)',
				}}
			>
				<img src={bgImg} alt="" height={'400px'} />
			</div>
			<div
				className="flex justify-content-center align-items-center"
				style={{ width: '40vw' }}
			>
				<Outlet />
			</div>
		</div>
	);
};
