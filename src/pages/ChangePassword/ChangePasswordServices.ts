import { useService } from '@api/useServices'

export const postChangePassword = () => {
  return useService().usePost('postChangePassword', '/password/request')
}
