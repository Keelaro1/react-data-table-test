import React, { memo, useCallback, useState } from 'react';
import { MainTableComponent } from './main-table';
import { TablePaginationComponent } from './table-pagination/table-pagination';

export const DEFAULT_START_PAGE = 0;

export const TableComponent = memo(() => {
	const [currentPage, setCurrentPage] = useState<number>(DEFAULT_START_PAGE);
	const changePage = useCallback((page: number) => setCurrentPage(page), []);

	return (
		<>
			<MainTableComponent currentPage={currentPage} />
			<TablePaginationComponent changePage={changePage} currentPage={currentPage} />
		</>
	);
});

TableComponent.displayName = 'TableComponent';
