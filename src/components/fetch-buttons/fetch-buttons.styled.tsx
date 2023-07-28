import { styled } from '@mui/system';
import { Button } from '@mui/material';

export const FetchButtonStyled = styled(Button)`
	width: 350px;
	height: 40px;
	&.MuiCircularProgress-root {
		width: 10px !important;
		height: 10px !important;
	}
`;
