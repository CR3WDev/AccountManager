import { ErrorMessageComponent } from '@components/ErrorMessage'
import { showToastSuccess } from '@components/GlobalToast.tsx'
import { PasswordFooter } from '@components/PasswordFooter'
import { PasswordHeader } from '@components/PasswordHeader'
import { getI18n } from '@hooks/useGetI18n.ts'
import { UseValidateEmail } from '@hooks/useValidateEmail.ts'
import { UseValidatePassword } from '@hooks/useValidatePassword.ts'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { classNames } from 'primereact/utils'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { IUserRegister } from '../RegisterInterfaces'
import { postRegister } from '../RegisterServices'

export const UserRegister = () => {
  const registerI18n = getI18n('register')
  const { mutateAsync: userRegister } = postRegister()
  const navigate = useNavigate()

  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
    register,
  } = useForm()

  const onSubmit = (data: any) => {
    const request: IUserRegister = {
      email: data?.email,
      password: data?.password,
      username: data?.username,
      companyName: data?.companyName,
    }
    userRegister(request).then(() => {
      showToastSuccess(registerI18n.success_message)
      navigate('/login')
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-2">
        <InputText
          className={classNames('w-full', {
            'p-invalid': errors.companyName,
          })}
          placeholder={registerI18n.companyName + '*'}
          id="companyName"
          {...register('companyName', {
            required: true,
          })}
        />
        <ErrorMessageComponent errors={errors.companyName} />
      </div>
      <div className="mb-2">
        <InputText
          className={classNames('w-full', {
            'p-invalid': errors.username,
          })}
          placeholder={registerI18n.username + '*'}
          id="username"
          {...register('username', {
            required: true,
          })}
        />
        <ErrorMessageComponent errors={errors.username} />
      </div>
      <div className="mb-2">
        <InputText
          className={classNames('w-full', {
            'p-invalid': errors.email,
          })}
          placeholder={registerI18n.email + '*'}
          id="email"
          {...register('email', {
            required: true,
            validate: (e) => {
              return UseValidateEmail(e) || 'Email Inválido'
            },
          })}
        />
        <ErrorMessageComponent errors={errors.email} />
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
                placeholder={registerI18n.password + '*'}
                strongRegex={'^(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&()_+])(?!.*\\s).{8,20}$'}
                inputStyle={{ width: '100%' }}
                maxLength={20}
                toggleMask
                promptLabel={registerI18n.choose_a_password}
                weakLabel={registerI18n.too_weak}
                mediumLabel={registerI18n.average}
                strongLabel={registerI18n.strong_password}
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
                placeholder={registerI18n.confirm_password + '*'}
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
        <Button className="w-full " label={registerI18n.create_account} />
      </div>
    </form>
  )
}
