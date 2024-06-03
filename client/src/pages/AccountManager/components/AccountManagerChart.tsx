import { Chart } from 'primereact/chart';
import { useFilterByBillType } from '../../../hooks/useFilterByBillType';
import { BillType, IBill } from '../../../types/bills';

interface AccountManagerChartProps {
	bills: IBill[];
	estimatedInvestimentValue: number;
	estimatedLeisureValue: number;
	estimatedEssentialValue: number;
}
export const AccountManagerChart = ({
	bills,
	estimatedEssentialValue,
	estimatedInvestimentValue,
	estimatedLeisureValue,
}: AccountManagerChartProps) => {
	const getTotalValueByTypeAndField = (billType: BillType) => {
		let count = 0;
		useFilterByBillType(bills, billType).map((bill) => {
			count = bill.paidValue + count;
		});
		return count;
	};

	const chartData = {
		labels: ['Essencial', 'Lazer', 'Investimento'],
		datasets: [
			{
				label: 'Valor Estimado',
				backgroundColor: 'rgb(54, 162, 235)',
				borderColor: 'rgb(54, 162, 235)',
				data: [
					estimatedEssentialValue,
					estimatedLeisureValue,
					estimatedInvestimentValue,
				],
			},
			{
				label: 'Valor Gasto',
				backgroundColor: 'rgba(54, 162, 235, 0.2)',
				borderColor: 'rgb(54, 162, 235)',
				data: [
					getTotalValueByTypeAndField(BillType.Essential),
					getTotalValueByTypeAndField(BillType.Leisure),
					getTotalValueByTypeAndField(BillType.Investment),
				],
			},
		],
	};

	return (
		<div className="flex justify-content-center">
			<Chart
				type="bar"
				data={chartData}
				style={{ width: '80vw' }}
				options={{ aspectRatio: 0.8, maintainAspectRatio: false }}
			/>
		</div>
	);
};
