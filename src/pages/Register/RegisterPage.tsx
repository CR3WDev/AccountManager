import { useNavigate } from "react-router-dom";
import { UserRegister } from "./components/UserRegister";

export const RegisterPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex align-items-center justify-content-center h-screen">
        <div className="w-16rem">
          <div className="text-center mb-3">
            <h1>Criar Conta</h1>
          </div>
          <UserRegister />
          <div className="text-center ">
            <div>
              <span>Já tem uma conta?</span>
              <span
                onClick={() => {
                  navigate("/auth/login");
                }}
                className="no-underline hover:underline text-primary cursor-pointer ml-2"
              >
                voltar
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
