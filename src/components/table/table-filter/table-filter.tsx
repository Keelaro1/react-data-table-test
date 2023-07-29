import { Button, Input, Container } from '@mui/material';
import React, { memo, useCallback, useContext, useState } from 'react';
import { TableData } from '../../../model/table.model';
import { AppContext } from '../../../App';

interface TableFilterProps {
	readonly changeData: (data: TableData[]) => void;
}

export const TableFilter = memo((props: TableFilterProps) => {
	const [inputValue, setInputValue] = useState<string>('');
	const { data } = useContext(AppContext);

	const { changeData } = props;
	const onTableFilterHandler = useCallback(() => {
		if (!inputValue) {
			changeData(data);
			return;
		}
		const filteredData = data.filter((tableItem: TableData) => {
			let foundAnyMatch = false;
			Object.values(tableItem).forEach((val: string) => {
				const strValue = val.toString().toLowerCase().trim();
				if (strValue.includes(inputValue.toLowerCase().trim())) {
					foundAnyMatch = true;
				}
			});
			if (foundAnyMatch) {
				return tableItem;
			}
		});
		changeData(filteredData);
	}, [changeData, inputValue, data]);

	const onChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value), []);

	return (
		<Container maxWidth="sm" sx={{ marginLeft: '0' }}>
			<Input onChange={onChangeHandler} value={inputValue} />
			<Button onClick={onTableFilterHandler}>Filter</Button>
		</Container>
	);
});

TableFilter.displayName = 'TableFilter';
