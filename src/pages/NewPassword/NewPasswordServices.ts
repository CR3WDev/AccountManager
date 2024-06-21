import { useService } from '@api/useServices'

export const postNewPassword = () => {
  return useService().usePost('postNewPassword', '/password/reset')
}
