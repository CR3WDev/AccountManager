import { api } from '../../api/axios';

export const getBills = () => {
	return api.get('/bills');
};
