import { Button, Input } from '@mui/material';
import React, { memo, useCallback, useState } from 'react';
import { TableData } from '../../../../model/table.model';
import { FilterContainerStyled } from './table-filter.styled';

interface TableFilterProps {
	readonly changeData: (data: TableData[]) => void;
	readonly resetAfterFilter: () => void;
	readonly currentData: TableData[];
}

export const TableFilter = memo((props: TableFilterProps) => {
	const { currentData, changeData, resetAfterFilter } = props;

	const [inputValue, setInputValue] = useState<string>('');
	const onTableFilterHandler = useCallback(() => {
		resetAfterFilter();
		if (!inputValue) {
			changeData(currentData);
			return;
		}
		const copyData = [...currentData];
		const filteredData = copyData.filter((tableItem: TableData) => {
			let isFoundRowMatch = false;
			Object.values(tableItem).forEach((val: string) => {
				const strValue = val.toString().toLowerCase().trim();
				const inputStrValue = inputValue.toString().toLowerCase().trim();
				if (strValue.includes(inputStrValue)) {
					isFoundRowMatch = true;
				}
			});
			return isFoundRowMatch && tableItem;
		});
		console.log(filteredData);
		if (filteredData.length === 0) {
			changeData(filteredData);
			setInputValue('');
			return;
		}
		changeData(filteredData);
		setInputValue('');
	}, [changeData, inputValue, currentData, resetAfterFilter]);

	const onInputHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value), []);

	const onFilterKeyUpHandler = useCallback(
		(e: React.KeyboardEvent<HTMLInputElement>) => {
			if (e.key === 'Enter') {
				e.preventDefault();
				onTableFilterHandler();
			}
		},
		[onTableFilterHandler],
	);

	return (
		<FilterContainerStyled>
			<Input onKeyUp={onFilterKeyUpHandler} onInput={onInputHandler} value={inputValue} />
			<Button onClick={onTableFilterHandler}>Filter</Button>
		</FilterContainerStyled>
	);
});

TableFilter.displayName = 'TableFilter';
