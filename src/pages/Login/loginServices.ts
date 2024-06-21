import { useService } from '@api/useServices'
import { Login } from '@pages/Auth/Login/LoginInterfaces.ts'

export const postLogin = () => {
  return useService().usePost<Login>('login', '/auth/login')
}
