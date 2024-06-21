import { ErrorMessageComponent } from '@components/ErrorMessage'
import { showToastSuccess } from '@components/GlobalToast'
import { PasswordFooter } from '@components/PasswordFooter'
import { PasswordHeader } from '@components/PasswordHeader'
import { getI18n } from '@hooks/useGetI18n'
import { UseValidatePassword } from '@hooks/useValidatePassword'
import { Button } from 'primereact/button'
import { Password } from 'primereact/password'
import { classNames } from 'primereact/utils'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { postNewPassword } from './NewPasswordServices'

export const NewPasswordPage = () => {
  const newPasswordI18n = getI18n('new_password')
  const navigate = useNavigate()
  const location = useLocation()

  const {
    formState: { errors },
    handleSubmit,
    control,
    watch,
  } = useForm()

  const { mutateAsync: newPassword } = postNewPassword()

  const getToken = () => {
    try {
      const searchParams = new URLSearchParams(location.search)
      const tokenBase64 = `${searchParams.get('params')}`
      if (!searchParams.has('params')) return undefined
      const token = atob(tokenBase64)
      return token
    } catch (e) {
      return undefined
    }
  }
  const onSubmit = (data: any) => {
    newPassword({
      newPassword: data.password,
      token: getToken(),
    }).then(() => {
      navigate('/login')
      showToastSuccess(newPasswordI18n.success_message)
    })
  }

  useEffect(() => {
    const token = getToken()
    if (!token) {
      navigate('/login')
    }
  }, [])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex align-items-center justify-content-center h-screen">
        <div className="w-16rem">
          <div className="text-center mb-3">
            <h1>{newPasswordI18n.title}</h1>
          </div>
          <div className=" mb-3 text-center">
            <span>{newPasswordI18n.description}</span>
          </div>
          <div className="mb-2">
            <Controller
              name="password"
              control={control}
              rules={{
                required: true,
                validate: (e) => {
                  return UseValidatePassword(e) || 'Senha Inválida'
                },
              }}
              render={({ field, fieldState }) => (
                <>
                  <Password
                    onChange={(e) => field.onChange(e)}
                    className={classNames({ 'p-invalid': fieldState.error })}
                    header={<PasswordHeader />}
                    footer={<PasswordFooter />}
                    placeholder={newPasswordI18n.password + '*'}
                    strongRegex={'^(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&()_+])(?!.*\\s).{8,20}$'}
                    inputStyle={{ width: '100%' }}
                    maxLength={20}
                    toggleMask
                    promptLabel={newPasswordI18n.choose_a_password}
                    weakLabel={newPasswordI18n.too_weak}
                    mediumLabel={newPasswordI18n.average}
                    strongLabel={newPasswordI18n.strong_password}
                    id={field.name}
                    name={field.name}
                  />
                  <ErrorMessageComponent errors={errors.password} />
                </>
              )}
            />
          </div>
          <div className=" mb-3">
            <Controller
              name="confirmPassword"
              control={control}
              rules={{
                required: true,
                validate: (e: string) => {
                  return e === watch('password') || 'Senhas devem ser iguais!'
                },
              }}
              render={({ field, fieldState }) => (
                <div className="custom-password">
                  <Password
                    onChange={(e) => field.onChange(e)}
                    placeholder={newPasswordI18n.confirm_password + '*'}
                    className={classNames({ 'p-invalid': fieldState.error })}
                    feedback={false}
                    toggleMask
                    inputStyle={{ width: '100%' }}
                  />
                  <ErrorMessageComponent errors={errors.confirmPassword} />
                </div>
              )}
            />
          </div>
          <div className=" mb-3">
            <Button className="w-full " label={newPasswordI18n.send} />
          </div>
          <div className="text-center  p-2 sm:p-0">
            <span
              onClick={() => {
                navigate('/login')
              }}
              className="no-underline hover:underline text-primary cursor-pointer"
            >
              {newPasswordI18n.back}
            </span>
          </div>
        </div>
      </div>
    </form>
  )
}
