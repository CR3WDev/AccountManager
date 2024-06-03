import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { Dispatch, SetStateAction } from 'react';
import { Controller, useForm } from 'react-hook-form';

interface FinanceTableAddDialogProps {
	isVisible: boolean;
	setIsVisible: Dispatch<SetStateAction<boolean>>;
}
export const FinanceTableAddDialog = ({
	isVisible,
	setIsVisible,
}: FinanceTableAddDialogProps) => {
	const { register, handleSubmit, control } = useForm();

	const onSubmit = (data: any) => {
		console.log(data);
		setIsVisible(false);
	};
	return (
		<Dialog
			visible={isVisible}
			header="Adicionar Conta"
			draggable={false}
			onHide={() => {
				setIsVisible(false);
			}}
		>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="flex flex-column">
					<label className="font-bold mb-1">Nome</label>
					<InputText
						placeholder="Nome"
						{...register('name', {
							required: true,
						})}
					/>
				</div>
				<div className="flex flex-column">
					<label className="font-bold mb-1">Valor Estimado</label>
					<Controller
						control={control}
						name="estimatedValue"
						render={() => {
							return (
								<InputNumber
									mode="currency"
									currency="BRL"
									placeholder="Valor Estimado"
								/>
							);
						}}
					/>
				</div>
				<div className="flex flex-column">
					<label className="font-bold mb-1">Valor Pago</label>
					<Controller
						control={control}
						name="paidValue"
						render={() => {
							return (
								<InputNumber
									mode="currency"
									name="paidValue"
									currency="BRL"
									placeholder="Valor Pago"
								/>
							);
						}}
					/>
				</div>
				<div className="flex justify-content-end mt-2">
					<Button label="Adicionar" />
				</div>
			</form>
		</Dialog>
	);
};
