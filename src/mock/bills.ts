import { BillType, IBill } from '../types/bills';

export const bills: IBill[] = [
	{
		id: 1,
		type: BillType.Essential,
		name: 'Electricity Bill',
		estimatedValue: 100,
		paidValue: 95,
	},
	{
		id: 2,
		type: BillType.Essential,
		name: 'Water Bill',
		estimatedValue: 50,
		paidValue: 50,
	},
	{
		id: 3,
		type: BillType.Essential,
		name: 'Internet Bill',
		estimatedValue: 70,
		paidValue: 70,
	},
	{
		id: 4,
		type: BillType.Leisure,
		name: 'Netflix Subscription',
		estimatedValue: 15,
		paidValue: 15,
	},
	{
		id: 5,
		type: BillType.Leisure,
		name: 'Gym Membership',
		estimatedValue: 40,
		paidValue: 40,
	},
	{
		id: 6,
		type: BillType.Leisure,
		name: 'Concert Tickets',
		estimatedValue: 120,
		paidValue: 120,
	},
	{
		id: 7,
		type: BillType.Investment,
		name: 'Stock Purchase',
		estimatedValue: 500,
		paidValue: 500,
	},
	{
		id: 8,
		type: BillType.Investment,
		name: 'Mutual Fund',
		estimatedValue: 200,
		paidValue: 200,
	},
	{
		id: 9,
		type: BillType.Investment,
		name: 'Retirement Fund',
		estimatedValue: 300,
		paidValue: 300,
	},
	{
		id: 10,
		type: BillType.Essential,
		name: 'Groceries',
		estimatedValue: 250,
		paidValue: 240,
	},
];
