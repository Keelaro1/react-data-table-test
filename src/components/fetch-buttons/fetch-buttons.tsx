import React, { memo, useCallback, useRef, useState } from 'react';
import { TableData, fetchOptions } from '../../model/table.model';
import { Button, CircularProgress } from '@mui/material';
import { ArrowIcon } from '../../ui-kit/icons/ArrowIcon';
import { FetchButtonGroupStyled, FetchButtonStyled } from './fetch-buttons.styled';
import { FetchButtonsPopover } from './fetch-buttons-popover/fetch-buttons-popover';
import { getFullUrl } from './fetch-url';

interface FetchButtonsProps {
	readonly setData: (data: TableData[]) => void;
}

export const FetchButtons = memo((props: FetchButtonsProps) => {
	const { setData } = props;
	const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
	const [isFetching, setIsFetching] = useState<boolean>(false);
	const [selectedIndex, setSelectedIndex] = useState<number>(0);
	const [isError, setIsError] = useState<boolean>(false);

	const anchorRef = useRef<HTMLDivElement>(null);

	const changeOption = useCallback((idx: number) => {
		setSelectedIndex(idx);
	}, []);

	const changePopoverVisibility = useCallback((isVisible: boolean) => setIsPopoverOpen(isVisible), []);

	const handleClick = useCallback(() => {
		const fullUrl = getFullUrl(selectedIndex);
		if (fullUrl) {
			setIsFetching(true);
			fetch(fullUrl)
				.then(response =>
					response.json().then(data => {
						setData(data);
						setIsError(false);
					}),
				)
				.catch(e => {
					console.log(e);
					setIsError(true);
				})
				.finally(() => setIsFetching(false));
		}
	}, [selectedIndex, setData]);

	const handleToggle = useCallback(() => {
		setIsPopoverOpen(prev => !prev);
	}, []);

	return (
		<>
			<FetchButtonGroupStyled disabled={isFetching} variant="contained" ref={anchorRef} aria-label="split button">
				<FetchButtonStyled onClick={handleClick}>
					{isFetching ? (
						<CircularProgress size={20} />
					) : isError ? (
						<span>An error occured, press to try again</span>
					) : (
						fetchOptions[selectedIndex]
					)}
				</FetchButtonStyled>
				<Button
					size="small"
					aria-controls={isPopoverOpen ? 'split-button-menu' : undefined}
					aria-expanded={isPopoverOpen ? 'true' : undefined}
					aria-label="select merge strategy"
					aria-haspopup="menu"
					onClick={handleToggle}>
					<ArrowIcon height="24px" width="24px" />
				</Button>
			</FetchButtonGroupStyled>
			<FetchButtonsPopover
				isOpen={isPopoverOpen}
				selectedIndex={selectedIndex}
				changePopoverVisibility={changePopoverVisibility}
				changeOption={changeOption}
				ref={anchorRef}
			/>
		</>
	);
});

FetchButtons.displayName = 'FetchButton';
