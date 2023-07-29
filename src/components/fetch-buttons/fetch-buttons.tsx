import React, { memo, useCallback, useRef, useState } from 'react';
import { TableData } from '../../model/table.model';
import {
	Button,
	ButtonGroup,
	CircularProgress,
	ClickAwayListener,
	Grow,
	MenuItem,
	MenuList,
	Paper,
	Popper,
} from '@mui/material';
import { ArrowIcon } from '../../ui-kit/icons/ArrowIcon';
import { FetchButtonStyled } from './fetch-buttons.styled';

interface FetchButtonsComponentProps {
	readonly loadData: (data: TableData[]) => void;
}

enum OptionsIndexDataAmount {
	SMALL = 0,
	BIG = 1,
}

const options = ['Download small amount of data', 'Download big amount of data'];

export const FetchButtonsComponent = memo((props: FetchButtonsComponentProps) => {
	const { loadData } = props;
	const [open, setOpen] = useState<boolean>(false);
	const [isFetching, setIsFetching] = useState<boolean>(false);
	const [selectedIndex, setSelectedIndex] = useState<number>(0);

	const anchorRef = useRef<HTMLDivElement>(null);

	const handleClick = useCallback(() => {
		const fullUrl = getFullUrl(selectedIndex);
		if (fullUrl) {
			setIsFetching(true);
			fetch(fullUrl).then(response =>
				response
					.json()
					.then(loadData)
					.finally(() => setIsFetching(false))
					.catch(console.log),
			);
		}
	}, [selectedIndex, loadData]);

	const handleMenuItemClick = useCallback((_: React.MouseEvent<HTMLLIElement, MouseEvent>, index: number) => {
		setSelectedIndex(index);
		setOpen(false);
	}, []);

	const handleToggle = useCallback(() => {
		setOpen(prevOpen => !prevOpen);
	}, []);

	const handleClose = useCallback((event: Event) => {
		if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
			return;
		}

		setOpen(false);
	}, []);

	return (
		<>
			<ButtonGroup disabled={isFetching} variant="contained" ref={anchorRef} aria-label="split button">
				<FetchButtonStyled onClick={handleClick}>
					{isFetching ? <CircularProgress size={20} /> : options[selectedIndex]}
				</FetchButtonStyled>
				<Button
					size="small"
					aria-controls={open ? 'split-button-menu' : undefined}
					aria-expanded={open ? 'true' : undefined}
					aria-label="select merge strategy"
					aria-haspopup="menu"
					onClick={handleToggle}>
					<ArrowIcon height="24px" width="24px" />
				</Button>
			</ButtonGroup>
			<Popper
				sx={{
					zIndex: 1,
				}}
				open={open}
				anchorEl={anchorRef.current}
				role={undefined}
				transition
				disablePortal>
				{({ TransitionProps, placement }) => (
					<Grow
						{...TransitionProps}
						style={{
							transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
						}}>
						<Paper>
							<ClickAwayListener onClickAway={handleClose}>
								<MenuList id="split-button-menu" autoFocusItem>
									{options.map((option, index) => (
										<MenuItem
											key={option}
											disabled={index === 2}
											selected={index === selectedIndex}
											onClick={event => handleMenuItemClick(event, index)}>
											{option}
										</MenuItem>
									))}
								</MenuList>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</Popper>
		</>
	);
});

const getFullUrl = (selectedIndex: number) => {
	const url = 'http://www.filltext.com/';
	const smallDataPostfix =
		'?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';
	const bigDataPostfix =
		'?rows=1000&id={number|1000}&firstName={firstName}&delay=1&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';
	switch (selectedIndex) {
		case OptionsIndexDataAmount.SMALL:
			return url + smallDataPostfix;
		case OptionsIndexDataAmount.BIG:
			return url + bigDataPostfix;
		default:
			return;
	}
};

FetchButtonsComponent.displayName = 'FetchButtonsComponent';
