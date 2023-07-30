import { Button, Input, Container } from '@mui/material';
import React, { memo, useCallback, useContext, useState } from 'react';
import { TableData } from '../../../../model/table.model';
import { AppContext } from '../../../../App';

interface TableFilterProps {
	readonly changeData: (data: TableData[]) => void;
	readonly resetAfterFilter: () => void;
}

/**
 * Filter won't show (and also remove) added via new row button data because it's not added to the "backend" data
 * and we also can't use "frontend" data (currentData object) as a data source since it will filter itself
 */
export const TableFilter = memo((props: TableFilterProps) => {
	const { changeData, resetAfterFilter } = props;

	const [inputValue, setInputValue] = useState<string>('');
	const { data } = useContext(AppContext);
	const onTableFilterHandler = useCallback(() => {
		resetAfterFilter();
		if (!inputValue) {
			changeData(data);
			return;
		}
		const filteredData = data.filter((tableItem: TableData) => {
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
		changeData(filteredData);
		setInputValue('');
	}, [changeData, inputValue, data, resetAfterFilter]);

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
		<Container maxWidth="sm" sx={{ marginLeft: '0' }}>
			<Input onKeyUp={onFilterKeyUpHandler} onInput={onInputHandler} value={inputValue} />
			<Button onClick={onTableFilterHandler}>Filter</Button>
		</Container>
	);
});

TableFilter.displayName = 'TableFilter';
