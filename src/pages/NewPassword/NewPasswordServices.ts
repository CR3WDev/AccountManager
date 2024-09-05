import { useService } from '@/utils/useServices';

export const postNewPassword = () => {
	return useService().usePost('postNewPassword', '/password/reset');
};
