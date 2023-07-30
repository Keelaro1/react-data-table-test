export const ENTRIES_PER_PAGE = 50;

export interface TableData {
	readonly id: number;
	readonly firstName: string;
	readonly lastName: string;
	readonly email: string;
	readonly phone: string;
	readonly address: TableDataAddress;
	readonly description: string;
}

interface TableDataAddress {
	readonly streetAddress: string;
	readonly city: string;
	readonly state: string;
	readonly zip: string;
}

export interface TableNewRowInputValue extends Omit<TableData, 'id'> {
	id: string;
}

export type TableNewRowHeader = keyof TableNewRowInputValue;
