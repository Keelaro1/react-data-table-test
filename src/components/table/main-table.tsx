import React, { memo, useContext, useMemo } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { AppContext } from '../../App';
import { ENTRIES_PER_PAGE } from '../../model/table.model';

interface MainTableComponentProps {
	readonly currentPage: number;
}

export const MainTableComponent = memo((props: MainTableComponentProps) => {
	const { data } = useContext(AppContext);
	const { currentPage } = props;
	const headers = useMemo(() => Object.keys((({ description, address, ...rest }) => ({ ...rest }))(data[0])), [data]);
	const dataToShow = useMemo(() => {
		const start = currentPage * ENTRIES_PER_PAGE;
		const end = start + ENTRIES_PER_PAGE;
		return data.slice(start, end);
	}, [currentPage, data]);

	return (
		<TableContainer sx={{ maxWidth: 800 }} component={Paper}>
			<Table aria-label="simple table">
				<TableHead>
					<TableRow>
						{headers.map(header => (
							<TableCell size={'small'} key={header} align="left">
								{header}
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{dataToShow.map(row => (
						<TableRow
							key={row.id + row.description}
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
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
		</TableContainer>
	);
});

MainTableComponent.displayName = 'MainTableComponent';
