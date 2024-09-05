export interface LoginResponseDTO {
	token: string;
	message: string;
	username: string;
}

export const getLoginResponseDTO = (): LoginResponseDTO | undefined => {
	const loginResponseDTOStringfy = sessionStorage.getItem('LoginResponseDTO');
	if (!loginResponseDTOStringfy) return undefined;
	return JSON.parse(loginResponseDTOStringfy);
};

export const setLoginResponseDTO = (loginResponseDTO: LoginResponseDTO) => {
	const loginResponseDTOStringfy = JSON.stringify(loginResponseDTO);
	if (!loginResponseDTOStringfy) return undefined;
	sessionStorage.setItem('LoginResponseDTO', loginResponseDTOStringfy);
};
