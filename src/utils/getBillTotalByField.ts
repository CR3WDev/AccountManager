import { IBill } from '../types/bills';

export const getBillTotalByField = (
	bills: IBill[],
	field: 'estimatedValue' | 'paidValue'
) => {
	let count = 0;

	bills.map((bill) => {
		const value = bill[field] || 0;
		count = value + count;
	});

	return count;
};
