import { IBill } from '../types/bills';

export const useGetBillTotalByField = (
	bills: IBill[],
	field: 'estimatedValue' | 'paidValue'
) => {
	let count = 0;

	bills.map((bill) => {
		let value = bill[field] || 0;
		count = value + count;
	});

	return count;
};
