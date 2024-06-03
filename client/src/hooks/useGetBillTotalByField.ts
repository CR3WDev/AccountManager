import { IBill } from '../types/bills';

export const useGetBillTotalByField = (
	bills: IBill[],
	field: 'estimatedValue' | 'paidValue'
) => {
	let count = 0;

	bills.map((bill) => {
		count = bill[field] + count;
	});
	return count;
};
