import React, { memo } from 'react';
import { IconProps } from './IconProps';

export const ArrowIcon = memo((props: IconProps) => {
	return (
		<svg
			style={{ ...props.style }}
			fill={props.fill ?? 'currentColor'}
			stroke={props.stroke ?? 'currentColor'}
			height={props.height ?? ''}
			width={props.width ?? ''}
			viewBox="0 0 24 24"
			data-testid="ArrowDropDownIcon">
			<path d="m7 10 5 5 5-5z"></path>
		</svg>
	);
});

ArrowIcon.displayName = 'ArrowIcon';
