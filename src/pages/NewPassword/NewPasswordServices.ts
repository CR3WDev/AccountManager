import { useService } from '@/hooks/useServices';

export const postNewPassword = () => {
	return useService().usePost('postNewPassword', '/password/reset');
};
