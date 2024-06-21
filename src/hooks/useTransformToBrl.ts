export const useTransformToBrl = (value: number) => {
	return new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL',
	}).format(!!value ? value : 0);
};
