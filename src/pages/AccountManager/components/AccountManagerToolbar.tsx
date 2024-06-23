import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Toolbar } from 'primereact/toolbar';
import { MdAdd } from 'react-icons/md';

export const AccountManagerToolbar = () => {
	const billsType = ['Essêncial', 'Lazer', 'Investimento'];

	return (
		<div className="mt-3">
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
		</div>
	);
};
