import { Box, Button, styled } from '@mui/material';

export const TableAddNewRowButtonStyled = styled(Button)`
	background: #1976d2;
	color: #fff;
	&:hover {
		background: #1565c0;
	}
	@media (max-width: 630px) {
		font-size: 12px;
	}
`;

export const TableModalContainerStyled = styled(Box)`
	width: 500px;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	border: 2px solid #000;
	background: #1976d2;
	color: #fff;
	max-width: 80%;
`;
