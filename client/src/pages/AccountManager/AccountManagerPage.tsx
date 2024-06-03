import { TabPanel, TabView } from 'primereact/tabview';
import { useEffect, useState } from 'react';
import { FinanceTable } from '../../components/FinanceTable/FinanceTable';
import { useFilterByBillType } from '../../hooks/useFilterByBillType';
import { BillType, IBill } from '../../types/bills';
import { getBills } from './AccountManagerService';
import { AccountManagerChart } from './components/AccountManagerChart';

export const AccountManagerPage = () => {
	const [bills, setBills] = useState<IBill[]>([]);
	const investimentValues = useFilterByBillType(bills, BillType.Investment);
	const leisureValues = useFilterByBillType(bills, BillType.Leisure);
	const essentialValues = useFilterByBillType(bills, BillType.Essential);

	const salary = 5000;
	const estimatedEssentialValue = salary * 0.5;
	const estimatedLeisureValue = salary * 0.3;
	const estimatedInvestimentValue = salary * 0.2;

	useEffect(() => {
		getBills().then((data) => {
			setBills(data.data);
		});
	}, []);

	return (
		<div>
			<h1 className="text-center">Finanças</h1>
			<TabView>
				<TabPanel header="Essencial">
					<FinanceTable
						type={BillType.Essential}
						bills={essentialValues}
						estimatedTableValue={estimatedEssentialValue}
					/>
				</TabPanel>
				<TabPanel header="Lazer">
					<FinanceTable
						type={BillType.Leisure}
						bills={leisureValues}
						estimatedTableValue={estimatedLeisureValue}
					/>
				</TabPanel>
				<TabPanel header="Investimentos">
					<FinanceTable
						type={BillType.Investment}
						bills={investimentValues}
						estimatedTableValue={estimatedInvestimentValue}
					/>
				</TabPanel>
				<TabPanel header="Dashboard">
					<AccountManagerChart
						bills={bills}
						estimatedEssentialValue={estimatedEssentialValue}
						estimatedLeisureValue={estimatedLeisureValue}
						estimatedInvestimentValue={estimatedInvestimentValue}
					/>
				</TabPanel>
			</TabView>
		</div>
	);
};
