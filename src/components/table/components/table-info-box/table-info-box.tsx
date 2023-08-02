import React, { memo } from 'react';
import { TableData } from '../../../../model/table.model';
import { Card } from '@mui/material';
import { TableInfoBoxDescriptionStyled, TableInfoBoxItemStyled, TableInfoBoxStyled } from './table-info-box.styled';

interface TableInfoBoxProps {
	readonly rowInfo: TableData;
}

export const TableInfoBox = memo((props: TableInfoBoxProps) => {
	const { rowInfo } = props;

	return (
		<Card sx={{ marginTop: 2 }}>
			<TableInfoBoxStyled>
				<TableInfoBoxItemStyled>
					Выбран пользователь: <b>{rowInfo.firstName} {rowInfo.lastName}</b>
				</TableInfoBoxItemStyled>
				<TableInfoBoxItemStyled>Описание:</TableInfoBoxItemStyled>
				<TableInfoBoxDescriptionStyled defaultValue={rowInfo.description} />
				<TableInfoBoxItemStyled>
					Адрес проживания: <b>{rowInfo.address.streetAddress}</b>
				</TableInfoBoxItemStyled>
				<TableInfoBoxItemStyled>
					Город: <b>{rowInfo.address.city}</b>
				</TableInfoBoxItemStyled>
				<TableInfoBoxItemStyled>
					Провинция/штат: <b>{rowInfo.address.state}</b>
				</TableInfoBoxItemStyled>
				<TableInfoBoxItemStyled>
					Индекс: <b>{rowInfo.address.zip}</b>
				</TableInfoBoxItemStyled>
			</TableInfoBoxStyled>
		</Card>
	);
});

TableInfoBox.displayName = 'TableInfoBox';
