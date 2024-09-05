import { BillType, IBill } from '../types/bills';

export const filterByBillType = (bills: IBill[], billType: BillType) => {
	return bills.filter((bill) => bill.type === billType);
};
