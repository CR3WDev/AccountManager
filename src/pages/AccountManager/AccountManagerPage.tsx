import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { TabPanel, TabView } from 'primereact/tabview';
import { Toolbar } from 'primereact/toolbar';
import { useEffect, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { BillType, IBill } from '../../types/bills';
import { getBills } from './AccountManagerService';
import { AccountManagerTable } from './components/AccountManagerTable';

export const AccountManagerPage = () => {
	const [bills, setBills] = useState<IBill[]>([]);
	const [refreshKey, setRefreshKey] = useState(0);
	const billsType = ['Essêncial', 'Lazer', 'Investimento'];
	useEffect(() => {
		getBills().then((data) => {
			setBills(data.data);
		});
	}, [refreshKey]);

	return (
		<>
			<div
				className="bg-primary flex justify-content-between p-3"
				style={{ height: '60px' }}
			>
				<div className="flex align-items-center">
					<div className="mr-6">
						<h2 className="p-0 m-0">AM</h2>
					</div>
					<div className="flex">
						<Button text label="Controle Financeiro" className="text-white" />
						<Button
							text
							label="Calculadora Juros Compostos"
							className="text-white"
						/>
					</div>
				</div>
				<div className="flex align-items-center">
					<div>
						<Button>Login</Button>
					</div>
				</div>
			</div>
			<div className="p-3">
				<TabView
					onTabChange={(e) => {
						console.log(e);
					}}
				>
					<TabPanel header="Planilha 1">
						<div>
							<Toolbar
								className="mb-3"
								end={() => {
									return (
										<div>
											<Button>
												<MdAdd size="20" className="mr-2" /> Adicionar
											</Button>
										</div>
									);
								}}
								start={() => {
									return (
										<>
											<div className="mr-2">
												<InputText placeholder="Pesquisar por Nome"></InputText>
											</div>
											<div className="mr-2">
												<Dropdown
													options={billsType}
													placeholder="Pesquisar por Tipo"
												></Dropdown>
											</div>
											<div>
												<Button>Limpar Filtros</Button>
											</div>
										</>
									);
								}}
							/>
							<AccountManagerTable
								type={BillType.Essential}
								bills={bills}
								setRefreshKey={setRefreshKey}
							/>
						</div>
					</TabPanel>
					<TabPanel header="+"></TabPanel>
				</TabView>
			</div>
		</>
	);
};
