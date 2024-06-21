import { useService } from '@api/useServices.ts'
import { IUserRegister } from './RegisterInterfaces'

export const postRegister = () => {
  return useService().usePost<IUserRegister>('register', '/auth/register')
}
