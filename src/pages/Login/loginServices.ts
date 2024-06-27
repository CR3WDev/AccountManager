import { useService } from '@/hooks/useServices';
import { Login } from './LoginInterfaces';

export const postLogin = () => {
	return useService().usePost<Login>('login', '/auth/login');
};
