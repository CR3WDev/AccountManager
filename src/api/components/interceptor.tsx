import { showToastError } from "@/components/GlobalToast.tsx";
import { ReactElement } from "react";
import { IApiException } from "../ApiInterfaces.ts";
import { api } from "../axios.ts";
import { getLoginResponseDTO } from "@/utils/getLoginResponseDTO.ts";

type InterceptorProps = {
  children: ReactElement;
};

export const Interceptor = ({ children }: InterceptorProps) => {
  api.interceptors.request.use(
    (config) => {
      const LoginResponseDTO = getLoginResponseDTO();
      if (LoginResponseDTO?.token) {
        config.headers.Authorization = `Bearer ${LoginResponseDTO?.token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error?.code === "ERR_NETWORK") {
        showToastError("Servidor Offline");
        throw new Error(error?.code);
      }

      const errorResponse: IApiException = error?.response?.data?.ApiException;

      if (!errorResponse) {
        return Promise.reject(error);
      }

      if (errorResponse.statusCode >= 400 && errorResponse.statusCode <= 500) {
        showToastError(errorResponse.message);
        throw new Error(errorResponse.message);
      }
      return Promise.reject(error);
    }
  );

  return children;
};
