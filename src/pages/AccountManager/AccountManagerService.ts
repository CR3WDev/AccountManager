import { api } from '../../api/axios';
import { IBill } from '../../types/bills';

export const getBills = () => {
	return api.get('/bills');
};
export const deleteBill = (id: number) => {
	return api.delete('/bills/' + id);
};
export const editBill = (id: number, bill: IBill) => {
	return api.put('/bills/' + id, bill);
};
export const addBill = (bill: IBill) => {
	return api.post('/bills', bill);
};
