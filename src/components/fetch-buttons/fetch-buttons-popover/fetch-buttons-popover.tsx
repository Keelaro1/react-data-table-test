import { ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper } from '@mui/material';
import React, { forwardRef, useCallback } from 'react';
import { fetchOptions } from '../../../model/table.model';

interface FetchButtonsPopoverProps {
	readonly isOpen: boolean;
	readonly selectedIndex: number;
	readonly changePopoverVisibility: (is: boolean) => void;
	readonly changeOption: (idx: number) => void;
}

export const FetchButtonsPopover = forwardRef<HTMLDivElement, FetchButtonsPopoverProps>((props, anchorRef) => {
	const { isOpen, selectedIndex, changePopoverVisibility, changeOption } = props;
	const innerRef = anchorRef as React.RefObject<HTMLDivElement>;

	const handleMenuItemClick = useCallback(
		(_: React.MouseEvent<HTMLLIElement, MouseEvent>, index: number) => {
			changeOption(index);
			changePopoverVisibility(false);
		},
		[changeOption, changePopoverVisibility],
	);

	const handleClose = useCallback(
		(event: Event) => {
			if (innerRef.current && innerRef.current.contains(event.target as HTMLElement)) {
				return;
			}
			changePopoverVisibility(false);
		},
		[changePopoverVisibility, innerRef],
	);
	return (
		<Popper
			sx={{
				zIndex: 1,
			}}
			open={isOpen}
			anchorEl={innerRef.current}
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
								{fetchOptions.map((option, index) => (
									<MenuItem
										key={option}
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
	);
});

FetchButtonsPopover.displayName = 'FetchButtonsPopover';
