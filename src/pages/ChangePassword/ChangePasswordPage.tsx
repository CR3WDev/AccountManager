import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { ErrorMessage } from "@/components/ErrorMessage";
import { showToastSuccess } from "@/components/GlobalToast";
import { postChangePassword } from "./ChangePasswordServices";
import { validateEmail } from "@/utils/validateEmail";

export const ChangePasswordPage = () => {
  const navigate = useNavigate();
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm();

  const { mutateAsync: changePassword } = postChangePassword();

  const onSubmit = (data: any) => {
    changePassword({
      email: data.email,
    }).then(() => {
      showToastSuccess("Email enviando com sucesso!");
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex align-items-center justify-content-center h-screen">
        <div className="w-16rem">
          <div className="text-center mb-3">
            <h1>Redefinir Senha</h1>
          </div>
          <div className=" mb-3 text-center">
            <span>Digite o email da sua conta para recuperar</span>
          </div>
          <div className=" mb-3">
            <InputText
              className={classNames("", {
                "p-invalid": errors.email,
              })}
              style={{ width: "100%" }}
              placeholder={"Email"}
              id="login"
              {...register("email", {
                required: true,
                validate: (e) => {
                  return validateEmail(e) || "Email Inválido!";
                },
              })}
            />
            <ErrorMessage errors={errors.email} />
          </div>
          <div className=" mb-3">
            <Button className="w-full " label={"Enviar"} />
          </div>
          <div className="text-center  p-2 sm:p-0">
            <span
              onClick={() => {
                navigate("/auth/login");
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
