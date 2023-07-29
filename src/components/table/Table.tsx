import React, { memo, useCallback, useState } from 'react';
import { MainTableComponent } from './main-table';

export const DEFAULT_START_PAGE = 0;

export const TableComponent = memo(() => {
	const [currentPage, setCurrentPage] = useState<number>(DEFAULT_START_PAGE);
	const changePage = useCallback((page: number) => setCurrentPage(page), []);

	return (
		<>
			<MainTableComponent currentPage={currentPage} changePage={changePage} />
		</>
	);
});

TableComponent.displayName = 'TableComponent';
