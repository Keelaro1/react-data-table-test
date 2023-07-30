import React, { memo, useContext, useMemo, useCallback, useState, useEffect } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { AppContext } from '../../App';
import { ENTRIES_PER_PAGE, TableData } from '../../model/table.model';
import { SortingOrder, sortArrayOfObjects } from '../../helpers/sorting-function';
import { ArrowIcon } from '../../ui-kit/icons/ArrowIcon';
import { TableFilter } from './components/table-filter/table-filter';
import { TableWrapper } from './table.styled';
import { TablePaginationComponent } from './components/table-pagination/table-pagination';
import { TableInfoBox } from './components/table-info-box/table-info-box';
import { TableAddNewRow } from './components/table-add-new-row/table-add-new-row';
import { create_UUID } from '../../helpers/uuid';

interface MainTableComponentProps {
	readonly currentPage: number;
	readonly changePage: (page: number) => void;
}

export const MainTableComponent = memo((props: MainTableComponentProps) => {
	const { data } = useContext(AppContext);
	const { currentPage, changePage } = props;

	const [currentData, setCurrentData] = useState<TableData[]>(data);
	const [currentSortingHeader, setCurrentSortingHeader] = useState<string | null>(null);
	const [currentSortingOrder, setCurrentSortingOrder] = useState<string | null>(null);

	const [rowInfoSelected, setRowInfoSelected] = useState<TableData | null>(null);

	const headers = useMemo(
		() => Object.keys((({ description: _, address: __, ...rest }) => ({ ...rest }))(data[0])),
		[data],
	);

	useEffect(() => {
		setCurrentData(data);
		setRowInfoSelected(null);
	}, [data]);

	const dataToShow = useMemo(() => {
		const start = currentPage * ENTRIES_PER_PAGE;
		const end = start + ENTRIES_PER_PAGE;
		return currentData.slice(start, end);
	}, [currentPage, currentData]);

	const onHeaderClickSortingHandler = useCallback(
		(header: string) => {
			let sortingOrder: SortingOrder = SortingOrder.ASCENDING;
			if (currentSortingHeader === header && currentSortingOrder === SortingOrder.ASCENDING) {
				sortingOrder = SortingOrder.DESCENDING;
			}
			const newData = sortArrayOfObjects([...currentData], header, sortingOrder);
			setCurrentSortingOrder(sortingOrder);
			setCurrentSortingHeader(header);
			setCurrentData(newData);
		},
		[currentData, currentSortingHeader, currentSortingOrder],
	);

	const changeData = useCallback((data: TableData[]) => setCurrentData(data), []);

	const onTableRowClickHandler = useCallback((row: TableData) => setRowInfoSelected(row), []);

	return (
		<>
			<TableAddNewRow headers={headers} changeData={changeData} currentData={currentData} />
			<TableWrapper>
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
										{header === currentSortingHeader && (
											<ArrowIcon
												height="24px"
												width="24px"
												fill="#1976d2"
												stroke="#1976d2"
												style={{
													position: 'absolute',
													transform: `rotate${
														currentSortingOrder === SortingOrder.ASCENDING
															? '(180deg)'
															: '(0deg)'
													}`,
												}}
											/>
										)}
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
						currentData={currentData}
						changePage={changePage}
						currentPage={currentPage}
					/>
				</TableContainer>
				<TableFilter
					changeData={changeData}
					resetAfterFilter={() => {
						setCurrentSortingHeader(null);
						setRowInfoSelected(null);
					}}
				/>
			</TableWrapper>
			{rowInfoSelected && <TableInfoBox rowInfo={rowInfoSelected} />}
		</>
	);
});

MainTableComponent.displayName = 'MainTableComponent';
