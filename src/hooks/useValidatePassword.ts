export const UseValidatePassword = (senha: string) => {
  const regex: RegExp = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&()_+])(?!.*\s).{8,20}$/
  return regex.test(senha)
}
