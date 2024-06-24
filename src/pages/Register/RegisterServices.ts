import { useService } from '@/hooks/useServices';
import { IUserRegister } from './RegisterInterfaces';

export const postRegister = () => {
	return useService().usePost<IUserRegister>('register', '/auth/register');
};
