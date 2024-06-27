import { ErrorMessage } from '@/components/ErrorMessage';
import { PasswordFooter } from '@/components/PasswordFooter';
import { PasswordHeader } from '@/components/PasswordHeader';
import { UseValidatePassword } from '@/hooks/useValidatePassword';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { classNames } from 'primereact/utils';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { postNewPassword } from './NewPasswordServices';

export const NewPasswordPage = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const {
		formState: { errors },
		handleSubmit,
		control,
		watch,
	} = useForm();

	const { mutateAsync: newPassword } = postNewPassword();

	const getToken = () => {
		try {
			const searchParams = new URLSearchParams(location.search);
			const tokenBase64 = `${searchParams.get('params')}`;
			if (!searchParams.has('params')) return undefined;
			const token = atob(tokenBase64);
			return token;
		} catch (e) {
			return undefined;
		}
	};
	const onSubmit = (data: any) => {
		newPassword({
			newPassword: data.password,
			token: getToken(),
		}).then(() => {
			navigate('/login');
		});
	};

	useEffect(() => {
		const token = getToken();
		if (!token) {
			navigate('/login');
		}
	}, []);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="flex align-items-center justify-content-center h-screen">
				<div className="w-16rem">
					<div className="text-center mb-3">
						<h1>Nova Senha</h1>
					</div>
					<div className=" mb-3 text-center">
						<span>Digite sua nova senha abaixo!</span>
					</div>
					<div className="mb-2">
						<Controller
							name="password"
							control={control}
							rules={{
								required: true,
								validate: (e) => {
									return UseValidatePassword(e) || 'Senha Inválida';
								},
							}}
							render={({ field, fieldState }) => (
								<>
									<Password
										onChange={(e) => field.onChange(e)}
										className={classNames({ 'p-invalid': fieldState.error })}
										header={<PasswordHeader />}
										footer={<PasswordFooter />}
										placeholder={'password *'}
										strongRegex={
											'^(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&()_+])(?!.*\\s).{8,20}$'
										}
										inputStyle={{ width: '100%' }}
										maxLength={20}
										toggleMask
										promptLabel={'Digite sua senha'}
										weakLabel={'Fraco'}
										mediumLabel={'Médio'}
										strongLabel={'Forte'}
										id={field.name}
										name={field.name}
									/>
									<ErrorMessage errors={errors.password} />
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
									return e === watch('password') || 'Senhas devem ser iguais!';
								},
							}}
							render={({ field, fieldState }) => (
								<div className="custom-password">
									<Password
										onChange={(e) => field.onChange(e)}
										placeholder={'Confirmar senha *'}
										className={classNames({ 'p-invalid': fieldState.error })}
										feedback={false}
										toggleMask
										inputStyle={{ width: '100%' }}
									/>
									<ErrorMessage errors={errors.confirmPassword} />
								</div>
							)}
						/>
					</div>
					<div className=" mb-3">
						<Button className="w-full " label={'Enviar'} />
					</div>
					<div className="text-center  p-2 sm:p-0">
						<span
							onClick={() => {
								navigate('/login');
							}}
							className="no-underline hover:underline text-primary cursor-pointer"
						>
							Voltar
						</span>
					</div>
				</div>
			</div>
		</form>
	);
};
