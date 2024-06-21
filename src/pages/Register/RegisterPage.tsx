import { getI18n } from '@hooks/useGetI18n'
import { useNavigate } from 'react-router-dom'
import { UserRegister } from './components/UserRegister'

export const RegisterPage = () => {
  const registerI18n = getI18n('register')
  const navigate = useNavigate()

  return (
    <div>
      <div className="flex align-items-center justify-content-center h-screen">
        <div className="w-16rem">
          <div className="text-center mb-3">
            <h1>{registerI18n.title}</h1>
          </div>
          <UserRegister />
          <div className="text-center ">
            <div>
              <span>{registerI18n.already_have_an_account}</span>
              <span
                onClick={() => {
                  navigate('/login')
                }}
                className="no-underline hover:underline text-primary cursor-pointer ml-2"
              >
                {registerI18n.go_login}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
