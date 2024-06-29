import ImgLogo from '@/assets/logo.png';
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';
import { MdLogin } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
export const Topbar = () => {
	const navigate = useNavigate();
	return (
		<div
			className="bg-primary flex justify-content-between p-3"
			style={{ height: '60px' }}
		>
			<div className="flex align-items-center">
				<div className="mr-6 flex">
					<div>
						<Image src={ImgLogo} height="30px" width="30px"></Image>
					</div>
					<h2 className="p-0 m-0 ml-2">AM</h2>
				</div>
				<div className="flex">
					<Button
						text
						label="Controle Financeiro"
						className="text-white"
						onClick={() => {
							navigate('/accountmanager');
						}}
					/>
					<Button
						text
						label="Calculadora Juros Compostos"
						className="text-white"
					/>
				</div>
			</div>
			<div className="flex align-items-center">
				<div>
					<Button
						onClick={() => {
							navigate('/login');
						}}
					>
						<MdLogin size="20" className="mr-2" /> Login
					</Button>
				</div>
			</div>
		</div>
	);
};
