import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { useState } from 'react';
import { MdAdd, MdClose, MdEdit } from 'react-icons/md';
import { useGetBillTotalByField } from '../../hooks/useGetBillTotalByField';
import { useTransformToBrl } from '../../hooks/useTransformToBrl';
import { BillType, IBill } from '../../types/bills';
import { FinanceTableAddDialog } from './FinanceTableAddDialog';

interface FinanceTableProps {
	bills: IBill[];
	type: BillType;
	estimatedTableValue: number;
}

export const FinanceTable = ({
	bills,
	estimatedTableValue,
}: FinanceTableProps) => {
	const [showAddDialog, setShowAddDialog] = useState(false);

	const textEditor = (options: any) => {
		return (
			<InputText
				type="text"
				value={options.value}
				onChange={(e) => options.editorCallback(e.target.value)}
			/>
		);
	};

	const priceEditor = (options: any) => {
		return (
			<InputNumber
				value={options.value}
				onValueChange={(e) => options.editorCallback(e.value)}
				mode="currency"
				currency="BRL"
				locale="pt-BR"
			/>
		);
	};

	const priceBodyTemplate = (value: number) => {
		if (!value) return '';
		return useTransformToBrl(value);
	};

	const footerTemplate = () => {
		return (
			<div
				className="flex justify-content-end"
				style={{ border: '1px solid #e5e7eb', background: '#f9fafb' }}
			>
				<div className="col-3 p-3">
					Valor Esperado: {useTransformToBrl(estimatedTableValue)}
				</div>
				<div className="col-3 p-3">
					Valor Estimado Total:{' '}
					{useTransformToBrl(useGetBillTotalByField(bills, 'estimatedValue'))}
				</div>
				<div className="col-3 p-3">
					Valor Total:{' '}
					{useTransformToBrl(useGetBillTotalByField(bills, 'paidValue'))}
				</div>
				<div className="col-3 p-3"></div>
			</div>
		);
	};

	return (
		<div>
			<FinanceTableAddDialog
				isVisible={showAddDialog}
				setIsVisible={setShowAddDialog}
			/>
			<DataTable
				value={bills}
				editMode="row"
				dataKey="id"
				tableStyle={{ minWidth: '50rem' }}
			>
				<Column
					field="name"
					header="Nome"
					editor={(options) => textEditor(options)}
					style={{ width: '20%' }}
				></Column>
				<Column
					field="estimatedValue"
					header="Valor Estimado"
					body={(row: IBill) => {
						return priceBodyTemplate(row.estimatedValue);
					}}
					editor={(options) => priceEditor(options)}
					style={{ width: '20%' }}
				></Column>
				<Column
					field="paidValue"
					header="Valor Pago"
					body={(row: IBill) => {
						return priceBodyTemplate(row.paidValue);
					}}
					editor={(options) => priceEditor(options)}
					style={{ width: '20%' }}
				></Column>
				<Column
					header="Ações"
					body={() => {
						return (
							<div className="flex">
								<Button outlined severity="info" className="mr-2">
									<MdEdit size="20" className="mr-2" /> Editar
								</Button>
								<Button outlined severity="danger">
									<MdClose size="20" className="mr-2" /> Remover
								</Button>
							</div>
						);
					}}
					headerStyle={{ width: '10%', minWidth: '8rem' }}
				></Column>
			</DataTable>
			<Button
				text
				className="w-full"
				onClick={() => {
					setShowAddDialog(true);
				}}
			>
				<MdAdd size="20" className="mr-2" /> Adicionar
			</Button>
			{footerTemplate()}
		</div>
	);
};
