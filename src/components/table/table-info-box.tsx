import React, { memo } from 'react';
import { TableInfoBoxStyled } from './table.styled';
import { TableData } from '../../model/table.model';

interface TableInfoBoxProps {
	readonly rowInfo: TableData;
}

export const TableInfoBox = memo((props: TableInfoBoxProps) => {
	const { rowInfo } = props;

	return (
		<TableInfoBoxStyled>
			<span>
				Выбран пользователь
				<b>
					{rowInfo.firstName} {rowInfo.lastName}
				</b>
			</span>
			<span>Описание:</span>
			<textarea defaultValue={rowInfo.description} />
			<span>
				Адрес проживания: <b>{rowInfo.address.streetAddress}</b>
			</span>
			<span>
				Город: <b>{rowInfo.address.city}</b>
			</span>
			<span>
				Провинция/штат: <b>{rowInfo.address.state}</b>
			</span>
			<span>
				Индекс: <b>{rowInfo.address.zip}</b>
			</span>
		</TableInfoBoxStyled>
	);
});

TableInfoBox.displayName = 'TableInfoBox';

// Выбран пользователь <b>Sue Corson</b>
// Описание:
// <textarea>
// et lacus magna dolor...
// </textarea>
// Адрес проживания: <b>9792 Mattis Ct</b>
// Город: <b>Waukesha</b>
// Провинция/штат: <b>WI</b>
// Индекс: <b>22178</b>
