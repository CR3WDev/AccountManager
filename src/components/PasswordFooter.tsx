import { Divider } from "primereact/divider";

export const PasswordFooter = () => {
  return (
    <>
      <Divider />
      <p className="mt-2">Ao menos:</p>
      <ul className="pl-2 ml-2 mt-0 line-height-3">
        <li>Pelo menos uma letra maiúscula</li>
        <li>Pelo menos um número</li>
        <li>Pelo menos um caráctere especial</li>
        <li>Pelo menos 8 carácteres</li>
      </ul>
    </>
  );
};
