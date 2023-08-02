import { styled } from '@mui/system';
import { Button, ButtonGroup } from '@mui/material';

export const FetchButtonGroupStyled = styled(ButtonGroup)`
	margin: 20px;
`;

export const FetchButtonStyled = styled(Button)`
	width: 350px;
	height: 40px;
	@media (max-width: 630px) {
		max-width: 230px;
		font-size: 12px;
		padding: 6px;
	}
`;
