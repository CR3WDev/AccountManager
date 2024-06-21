export enum BillType {
	Essential = 'Essential',
	Leisure = 'Leisure',
	Investment = 'Investment',
}

export interface IBill {
	id: number;
	type: BillType;
	name: String;
	estimatedValue: number;
	paidValue: number;
}
