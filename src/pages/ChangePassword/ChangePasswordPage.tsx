import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { classNames } from 'primereact/utils'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { ErrorMessageComponent } from '@components/ErrorMessage'
import { showToastSuccess } from '@components/GlobalToast'
import { getI18n } from '@hooks/useGetI18n'
import { UseValidateEmail } from '@hooks/useValidateEmail'
import { postChangePassword } from './ChangePasswordServices'

export const ChangePasswordPage = () => {
  const changePasswordI18n = getI18n('change_password')
  const navigate = useNavigate()
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm()

  const { mutateAsync: changePassword } = postChangePassword()

  const onSubmit = (data: any) => {
    changePassword({
      email: data.email,
    }).then(() => {
      showToastSuccess(getI18n('email_success_message'))
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex align-items-center justify-content-center h-screen">
        <div className="w-16rem">
          <div className="text-center mb-3">
            <h1>{changePasswordI18n.title}</h1>
          </div>
          <div className=" mb-3 text-center">
            <span>{changePasswordI18n.description}</span>
          </div>
          <div className=" mb-3">
            <InputText
              className={classNames('', {
                'p-invalid': errors.email,
              })}
              style={{ width: '100%' }}
              placeholder={changePasswordI18n.email}
              id="login"
              {...register('email', {
                required: true,
                validate: (e) => {
                  return UseValidateEmail(e) || getI18n('invalid_email')
                },
              })}
            />
            <ErrorMessageComponent errors={errors.email} />
          </div>
          <div className=" mb-3">
            <Button className="w-full " label={changePasswordI18n.send} />
          </div>
          <div className="text-center  p-2 sm:p-0">
            <span
              onClick={() => {
                navigate('/login')
              }}
              className="no-underline hover:underline text-primary cursor-pointer"
            >
              {changePasswordI18n.back}
            </span>
          </div>
        </div>
      </div>
    </form>
  )
}
