import React, { memo, useState, useCallback } from 'react';
import { TableAddNewRowButtonStyled, TableModalContainerStyled } from './table-add-new-row.styled';
import {
	Button,
	Input,
	Modal,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material';
import { TableNewRowHeader, TableNewRowInputValue, TableData } from '../../../../../model/table.model';
import { INITIAL_INPUT_VALUES, useValidateAddRow } from './useValidateAddRow';

interface TableAddNewRowProps {
	readonly headers: string[];
	readonly changeData: (data: TableData[]) => void;
	readonly currentData: TableData[];
}

export const TableAddNewRow = memo((props: TableAddNewRowProps) => {
	const { headers, changeData, currentData } = props;
	const typedHeaders = [...headers] as TableNewRowHeader[];

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const { onInput, inputValues, noValidationErrors, clearInputs } = useValidateAddRow();

	const openAddNewRowModal = useCallback(() => setIsOpen(true), []);
	const closeAddNewRowModal = useCallback(() => setIsOpen(false), []);

	const onAddNewRowHandler = useCallback(
		(inputValues: TableNewRowInputValue) => {
			changeData([mapInputValuesToData(inputValues), ...currentData]);
			closeAddNewRowModal();
			clearInputs();
		},
		[changeData, currentData, closeAddNewRowModal, clearInputs],
	);

	return (
		<>
			<TableAddNewRowButtonStyled onClick={openAddNewRowModal} sx={{ display: 'block' }}>
				Add New Row
			</TableAddNewRowButtonStyled>
			<Modal
				open={isOpen}
				onClose={closeAddNewRowModal}
				aria-labelledby="parent-modal-title"
				aria-describedby="parent-modal-description">
				<TableModalContainerStyled>
					<TableContainer component={Paper}>
						<Table aria-label="simple table">
							<TableHead>
								<TableRow>
									{typedHeaders.map(header => (
										<TableCell size={'small'} key={header} align="left">
											{header}
										</TableCell>
									))}
								</TableRow>
							</TableHead>
							<TableBody>
								<TableRow>
									{typedHeaders.map(header => (
										<TableCell key={`${header}Input`} size={'small'} align="left">
											<Input value={inputValues[header]} onChange={e => onInput(e, header)} />
										</TableCell>
									))}
								</TableRow>
								<TableRow>
									<TableCell size={'small'} align="left">
										{noValidationErrors && (
											<Button onClick={_ => onAddNewRowHandler(inputValues)}>Add</Button>
										)}
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>
				</TableModalContainerStyled>
			</Modal>
		</>
	);
});

const mapInputValuesToData = (inputValues: TableNewRowInputValue): TableData => ({
	...INITIAL_INPUT_VALUES,
	...inputValues,
	id: parseInt(inputValues.id, 10),
});

TableAddNewRow.displayName = 'TableAddNewRow';
