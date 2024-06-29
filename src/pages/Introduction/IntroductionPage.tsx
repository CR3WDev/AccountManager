import bgImg from '@/assets/bgimg.svg';
import circle from '@/assets/circle.svg';
import logo from '@/assets/logo.png';
import { Button } from 'primereact/button';
import { MdLogin } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

export const IntroductionPage = () => {
	const navigate = useNavigate();
	return (
		<div style={{ height: '100vh', overflow: 'auto' }}>
			<div>
				<div
					className="flex justify-content-between p-3"
					style={{ height: '60px' }}
				>
					<div className="flex align-items-center">
						<div className="mr-6 flex">
							<div>
								<img src={logo} height="30px" width="30px"></img>
							</div>
							<h2 className="p-0 m-0 ml-2 flex justify-content-center align-items-center">
								AM
							</h2>
						</div>
						<div className="flex">
							<Button text label="Calculadora Juros Compostos" />
						</div>
					</div>
					<div className="flex align-items-center">
						<div>
							<Button
								onClick={() => {
									navigate('/auth/login');
								}}
							>
								<MdLogin size="20" className="mr-2" /> Login
							</Button>
						</div>
					</div>
				</div>
				<div
					className="flex justify-content-evenly"
					style={{ height: 'calc(100vh - 60px)' }}
				>
					<div className="flex justify-content-center align-items-center">
						<img src={bgImg}></img>
					</div>
					<div
						className="flex flex-column justify-content-center align-items-center"
						style={{ width: '500px' }}
					>
						<div>
							<h1>Gerencie Suas Finanças com Facilidade</h1>
						</div>
						<div>
							<p>
								Com nosso aplicativo, você tem controle total sobre suas
								despesas e receitas, garantindo um planejamento financeiro
								eficaz e inteligente para alcançar todos os seus objetivos.
							</p>
						</div>
					</div>
				</div>
			</div>
			<div>
				<img
					src={circle}
					alt="primeflex"
					className="relative"
					style={{
						bottom: '500px',
						zIndex: '-999',
						right: '600px',
						display: 'flex',
					}}
				/>
				<img
					src={circle}
					alt="primeflex"
					className="relative"
					style={{
						top: '-3000px',
						zIndex: '-999',
						left: '1000px',
						display: 'flex',
					}}
				/>
			</div>
		</div>
	);
};
