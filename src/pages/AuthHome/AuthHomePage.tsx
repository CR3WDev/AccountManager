import bgImg from '@/assets/bgimg2.svg';
import logo from '@/assets/logo.png';
import { Button } from 'primereact/button';
import { Outlet, useNavigate } from 'react-router-dom';

export const AuthHomePage = () => {
	const navigate = useNavigate();
	return (
		<div className="flex h-screen">
			<div
				className="bg-primary"
				style={{
					width: 'calc(60vw)',
				}}
			>
				<div className="p-2">
					<Button
						text
						onClick={() => {
							navigate('/');
						}}
					>
						<div className="flex text-white">
							<div className="mr-1">
								<img src={logo} height="30px" width="30px"></img>
							</div>
							<h2 className="m-0 p-0 flex align-items-center">AM</h2>
						</div>
					</Button>
				</div>
				<div
					className="flex justify-content-center align-items-center"
					style={{ height: 'calc(100vh - 76px)' }}
				>
					<img src={bgImg} alt="" height={'400px'} />
				</div>
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
