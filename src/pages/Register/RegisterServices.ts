import { useService } from '@/utils/useServices';
import { IUserRegister } from './RegisterInterfaces';

export const postRegister = () => {
	return useService().usePost<IUserRegister>('register', '/auth/register');
};
