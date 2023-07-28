import { Pagination } from '@mui/material';
import React, { memo, useCallback, useContext, useEffect, useMemo } from 'react';
import { AppContext } from '../../App';
import { ENTRIES_PER_PAGE } from '../../model/table.model';
import { DEFAULT_START_PAGE } from './table';

interface TablePaginationComponentProps {
	readonly changePage: (page: number) => void;
	readonly currentPage: number;
}

export const TablePaginationComponent = memo((props: TablePaginationComponentProps) => {
	const { changePage, currentPage } = props;
	const { data } = useContext(AppContext);

	const pages = useMemo(() => Math.ceil(data.length / ENTRIES_PER_PAGE), [data]);

	// reset the page if data is fetched again
	useEffect(() => changePage(DEFAULT_START_PAGE), [data, changePage]);

	const changePageHandler = useCallback(
		(_: React.ChangeEvent<unknown>, value: number) => changePage(value - 1),
		[changePage],
	);

	return <Pagination onChange={changePageHandler} count={pages} page={currentPage + 1} />;
});

TablePaginationComponent.displayName = 'TablePaginationComponent';
