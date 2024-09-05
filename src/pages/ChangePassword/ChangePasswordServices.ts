import { useService } from '@/utils/useServices';

export const postChangePassword = () => {
	return useService().usePost('postChangePassword', '/password/request');
};
