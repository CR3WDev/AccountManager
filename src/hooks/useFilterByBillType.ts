import { BillType, IBill } from '../types/bills';

export const useFilterByBillType = (bills: IBill[], billType: BillType) => {
	return bills.filter((bill) => bill.type === billType);
};
