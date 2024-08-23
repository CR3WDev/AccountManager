import { ErrorMessage } from "@/components/ErrorMessage";
import { PasswordFooter } from "@/components/PasswordFooter";
import { PasswordHeader } from "@/components/PasswordHeader";
import { UseValidateEmail } from "@/hooks/useValidateEmail";
import { UseValidatePassword } from "@/hooks/useValidatePassword";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { classNames } from "primereact/utils";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IUserRegister } from "../RegisterInterfaces";
import { postRegister } from "../RegisterServices";
// import { postRegister } from '../RegisterServices';

export const UserRegister = () => {
  const { mutateAsync: userRegister } = postRegister();
  const navigate = useNavigate();
  const regexPassword =
    "^(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&()_+])(?!.*\\s).{8,20}$";
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
    register,
  } = useForm();

  const onSubmit = (data: any) => {
    const request: IUserRegister = {
      email: data?.email,
      password: data?.password,
      fullName: data?.fullName,
    };

    userRegister(request).then(() => {
      navigate("/auth/login");
    });
  };

  const validateIsSecurePassword = (value: string) => {
    return new RegExp(regexPassword).test(value);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-2">
        <InputText
          className={classNames("w-full", {
            "p-invalid": errors.fullName,
          })}
          placeholder={"Nome" + "*"}
          id="fullName"
          {...register("fullName", {
            required: true,
          })}
        />
        <ErrorMessage errors={errors.fullName} />
      </div>
      <div className="mb-2">
        <InputText
          className={classNames("w-full", {
            "p-invalid": errors.email,
          })}
          placeholder={"Email" + "*"}
          id="email"
          {...register("email", {
            required: true,
            validate: (e) => {
              return UseValidateEmail(e) || "Email Inválido";
            },
          })}
        />
        <ErrorMessage errors={errors.email} />
      </div>
      <div className="mb-2">
        <Controller
          name="password"
          control={control}
          rules={{
            required: true,
            validate: (e) => {
              return (
                UseValidatePassword(e) ||
                validateIsSecurePassword(e) ||
                "Senha Inválida"
              );
            },
          }}
          render={({ field, fieldState }) => (
            <>
              <Password
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                className={classNames({ "p-invalid": fieldState.error })}
                header={<PasswordHeader />}
                footer={<PasswordFooter />}
                placeholder={"Senha" + "*"}
                strongRegex={regexPassword}
                inputStyle={{ width: "100%" }}
                maxLength={20}
                toggleMask
                value={field.value}
                promptLabel={"Escolha uma senha"}
                weakLabel={"Fraca"}
                mediumLabel={"Médio"}
                strongLabel={"Forte"}
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
              return e === watch("password") || "Senhas devem ser iguais!";
            },
          }}
          render={({ field, fieldState }) => (
            <div className="custom-password">
              <Password
                onChange={(e) => field.onChange(e)}
                placeholder={"Confirmar Senha" + "*"}
                className={classNames({ "p-invalid": fieldState.error })}
                feedback={false}
                toggleMask
                inputStyle={{ width: "100%" }}
              />
              <ErrorMessage errors={errors.confirmPassword} />
            </div>
          )}
        />
      </div>
      <div className=" mb-3">
        <Button className="w-full " label={"Crie uma conta"} />
      </div>
    </form>
  );
};
