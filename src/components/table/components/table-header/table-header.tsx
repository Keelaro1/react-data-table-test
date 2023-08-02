import React, { memo } from 'react';
import { TableAddNewRow } from './table-add-new-row/table-add-new-row';
import { TableFilter } from './table-filter/table-filter';
import { TableData } from '../../../../model/table.model';
import { TableHeaderStyled } from './table-header.styled';

interface TableHeaderProps {
	readonly headers: string[];
	readonly changeData: (data: TableData[]) => void;
	readonly changeFilterData: (data: TableData[]) => void;
	readonly currentData: TableData[];
	readonly resetAfterFilter: () => void;
	readonly changePage: (page: number) => void;
}

export const TableHeader = memo((props: TableHeaderProps) => {
	const { headers, currentData, changeData, changeFilterData, resetAfterFilter, changePage } = props;
	return (
		<TableHeaderStyled>
			<TableAddNewRow headers={headers} changeData={changeData} currentData={currentData} />
			<TableFilter
				currentData={currentData}
				changeData={changeFilterData}
				resetAfterFilter={resetAfterFilter}
				changePage={changePage}
			/>
		</TableHeaderStyled>
	);
});

TableHeader.displayName = 'TableHeader';
