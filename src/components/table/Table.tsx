import React, { memo,  useContext } from 'react';
import { MainTableComponent } from './main-table';
import { AppContext } from '../../App';

export const TableComponent = memo(() => {
	const { data } = useContext(AppContext);

	return (
		<>
			<MainTableComponent />
		</>
	);
});

TableComponent.displayName = 'TableComponent';
