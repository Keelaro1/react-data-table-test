import React from 'react';
import { TableData } from '../../model/table.model';

interface TableProps {
	readonly data: TableData;
}

export const TableComponent = (props: TableProps) => {
	const { data } = props;

	return <div>{JSON.stringify(data)}</div>;
};
