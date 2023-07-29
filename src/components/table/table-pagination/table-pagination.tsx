import { Pagination, Popover, TextField } from '@mui/material';
import React, { memo, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { AppContext } from '../../../App';
import { ENTRIES_PER_PAGE } from '../../../model/table.model';
import { DEFAULT_START_PAGE } from '../table';

interface TablePaginationComponentProps {
	readonly changePage: (page: number) => void;
	readonly currentPage: number;
}

export const TablePaginationComponent = memo((props: TablePaginationComponentProps) => {
	const { changePage, currentPage } = props;
	const { data } = useContext(AppContext);
	const [showPageSelector, setShowSelector] = useState<boolean>(false);
	const [anchorEl, setAnchorEl] = useState<any | null>(null);

	const pages = useMemo(() => Math.ceil(data.length / ENTRIES_PER_PAGE), [data]);

	// reset the page if data is fetched again
	useEffect(() => changePage(DEFAULT_START_PAGE), [data, changePage]);

	const changePageHandler = useCallback(
		(_: React.ChangeEvent<unknown>, value: number) => changePage(value - 1),
		[changePage],
	);

	const handleClose = useCallback(() => setShowSelector(false), []);

	// recalculate ref to set the correct anchor
	useEffect(() => changeAnchor(), [currentPage]);

	const changeAnchor = () => {
		const pageSelectorAnchor = document.querySelector('.MuiPaginationItem-ellipsis');
		setAnchorEl(pageSelectorAnchor);
		pageSelectorAnchor?.addEventListener('click', _ => {
			setShowSelector(true);
		});
		return () => {
			pageSelectorAnchor?.removeEventListener('click', _ => {
				setShowSelector(true);
			});
		};
	};

	const onPageSelectorHandler = useCallback(
		(e: React.KeyboardEvent<HTMLDivElement>) => {
			if (e.key === 'Enter') {
				e.preventDefault();
				const target = e.target as HTMLTextAreaElement;
				const targetValue = parseInt(target.value, 10);
				if (targetValue < 1 || targetValue > pages) {
					return;
				}
				setShowSelector(false);
				changePageHandler(e, parseInt(target.value, 10));
			}
		},
		[changePageHandler, pages],
	);

	return (
		<>
			<Pagination onChange={changePageHandler} count={pages} page={currentPage + 1} />
			<Popover
				id={'pageSelectorPopover'}
				open={showPageSelector}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}>
				<TextField
					autoFocus={true}
					placeholder="Choose a page"
					type={'number'}
					onKeyUp={onPageSelectorHandler}
					inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}></TextField>
			</Popover>
		</>
	);
});

TablePaginationComponent.displayName = 'TablePaginationComponent';
