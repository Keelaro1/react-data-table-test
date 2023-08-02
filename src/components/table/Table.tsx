import React, { memo, useMemo, useCallback, useState, useEffect } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { ENTRIES_PER_PAGE, TableData } from '../../model/table.model';
import { SortingOrder, sortArrayOfObjects } from '../../helpers/sorting-function';
import { ArrowIcon } from '../../ui-kit/icons/ArrowIcon';
import { TableContent, TableWrapper } from './table.styled';
import { TablePaginationComponent } from './components/table-pagination/table-pagination';
import { TableInfoBox } from './components/table-info-box/table-info-box';
import { create_UUID } from '../../helpers/uuid';
import { TableHeader } from './components/table-header/table-header';

interface TableComponentProps {
	initialData: TableData[];
}

export const DEFAULT_START_PAGE = 0;

export const TableComponent = memo((props: TableComponentProps) => {
	const { initialData } = props;
	const [currentPage, setCurrentPage] = useState<number>(DEFAULT_START_PAGE);
	const changePage = useCallback((page: number) => setCurrentPage(page), []);

	const [currentData, setCurrentData] = useState<TableData[]>(initialData);
	const [filteredData, setFilteredData] = useState<TableData[] | null>(null);
	const [currentSortingHeader, setCurrentSortingHeader] = useState<string | null>(null);
	const [currentSortingOrder, setCurrentSortingOrder] = useState<string | null>(null);
	const [rowInfoSelected, setRowInfoSelected] = useState<TableData | null>(null);

	const headers = useMemo(
		() => Object.keys((({ description: _, address: __, ...rest }) => ({ ...rest }))(initialData[0])),
		[initialData],
	);

	// reset state if fetched again
	useEffect(() => {
		setCurrentData(initialData);
		setRowInfoSelected(null);
		changePage(DEFAULT_START_PAGE);
		setCurrentSortingHeader(null);
	}, [initialData, changePage]);

	useEffect(() => {
		setFilteredData(currentData);
	}, [currentData]);

	const dataToShow = useMemo(() => {
		const start = currentPage * ENTRIES_PER_PAGE;
		const end = start + ENTRIES_PER_PAGE;
		const data = filteredData ? [...filteredData] : [...currentData];
		return data.slice(start, end);
	}, [currentPage, currentData, filteredData]);

	const onHeaderClickSortingHandler = useCallback(
		(header: string) => {
			let sortingOrder: SortingOrder = SortingOrder.ASCENDING;
			if (currentSortingHeader === header && currentSortingOrder === SortingOrder.ASCENDING) {
				sortingOrder = SortingOrder.DESCENDING;
			}
			const newData = sortArrayOfObjects(
				filteredData ? [...filteredData] : [...currentData],
				header,
				sortingOrder,
			);
			setCurrentSortingOrder(sortingOrder);
			setCurrentSortingHeader(header);
			setFilteredData(newData);
		},
		[filteredData, currentSortingHeader, currentSortingOrder, currentData],
	);

	const changeData = useCallback((data: TableData[]) => setCurrentData(data), []);
	const setFilteredDataHandler = useCallback((data: TableData[]) => setFilteredData(data), []);

	const resetAfterFilter = useCallback(() => {
		setCurrentSortingHeader(null);
		setRowInfoSelected(null);
	}, []);

	const onTableRowClickHandler = useCallback((row: TableData) => setRowInfoSelected(row), []);

	const TableSortArrowIcon = (
		<ArrowIcon
			height="24px"
			width="24px"
			fill="#1976d2"
			stroke="#1976d2"
			style={{
				position: 'absolute',
				transform: `rotate${currentSortingOrder === SortingOrder.ASCENDING ? '(180deg)' : '(0deg)'}`,
			}}
		/>
	);

	return (
		<TableWrapper>
			<TableHeader
				headers={headers}
				changeFilterData={setFilteredDataHandler}
				changeData={changeData}
				currentData={currentData}
				resetAfterFilter={resetAfterFilter}
				changePage={changePage}
			/>
			<TableContent>
				<TableContainer sx={{ maxWidth: 800 }} component={Paper}>
					<Table aria-label="simple table">
						<TableHead>
							<TableRow>
								{headers.map(header => (
									<TableCell
										style={{ cursor: 'pointer', userSelect: 'none', width: 220 }}
										onClick={_ => onHeaderClickSortingHandler(header)}
										size={'small'}
										key={header}
										align="left">
										{header}
										{header === currentSortingHeader && TableSortArrowIcon}
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{dataToShow.map(row => (
								<TableRow
									onClick={() => onTableRowClickHandler(row)}
									key={create_UUID()}
									sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}>
									<TableCell component="th" scope="row">
										{row.id}
									</TableCell>
									<TableCell align="left">{row.firstName}</TableCell>
									<TableCell align="left">{row.lastName}</TableCell>
									<TableCell align="left">{row.email}</TableCell>
									<TableCell align="left">{row.phone}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
					<TablePaginationComponent
						currentData={filteredData ?? currentData}
						changePage={changePage}
						currentPage={currentPage}
					/>
				</TableContainer>
			</TableContent>
			{rowInfoSelected && <TableInfoBox rowInfo={rowInfoSelected} />}
		</TableWrapper>
	);
});

TableComponent.displayName = 'TableComponent';
