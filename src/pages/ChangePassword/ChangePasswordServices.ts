import { useService } from '@/hooks/useServices';

export const postChangePassword = () => {
	return useService().usePost('postChangePassword', '/password/request');
};
