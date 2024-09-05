import { ErrorMessage } from "@/components/ErrorMessage";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { classNames } from "primereact/utils";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { postLogin } from "./loginServices";
import { setLoginResponseDTO } from "@/utils/getLoginResponseDTO";

export const LoginPage = () => {
  const navigate = useNavigate();
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm();

  const { mutateAsync: sendLogin } = postLogin();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    console.log(data);
    const response = await sendLogin(data)
    setLoginResponseDTO(response?.data?.LoginResponseDTO);
    navigate("/accountManager");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex align-items-center justify-content-center h-screen">
        <div className="w-16rem">
          <div className="text-center">
            <h1>AM</h1>
          </div>
          <div className="mb-2">
            <InputText
              className={classNames("w-full", {
                "p-invalid": errors.login,
              })}
              placeholder={"Email"}
              id="login"
              {...register("login", {
                required: true,
              })}
            />
            <ErrorMessage errors={errors.login} />
          </div>
          <div className="mb-3">
            <Controller
              name="password"
              control={control}
              rules={{ required: true }}
              render={({ field, fieldState }) => (
                <div>
                  <Password
                    onChange={(e) => field.onChange(e)}
                    placeholder={"Senha"}
                    className={classNames({
                      "p-invalid": fieldState.error,
                    })}
                    feedback={false}
                    toggleMask
                    inputStyle={{ width: "100%" }}
                  />
                  <ErrorMessage errors={errors.password} />
                </div>
              )}
            />
          </div>
          <div className="mb-3">
            <Button className="w-full" label={"Login"} />
          </div>
          <div className="text-center">
            <div className="flex flex-wrap align-items-center justify-content-center p-2">
              <span>Não tem conta?</span>
              <span
                onClick={() => {
                  navigate("/auth/register");
                }}
                className="no-underline hover:underline text-primary cursor-pointer ml-1"
              >
                {"Registre-se"}
              </span>
            </div>
            <div className="mb-1">
              <span
                onClick={() => {
                  navigate("/auth/changepassword");
                }}
                className="no-underline hover:underline text-primary cursor-pointer"
              >
                Esqueceu senha?
              </span>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
