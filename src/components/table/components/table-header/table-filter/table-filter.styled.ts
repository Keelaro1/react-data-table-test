import { Container, styled } from '@mui/material';

export const FilterContainerStyled = styled(Container)`
	margin-left: 0;
	margin-right: 0;
	padding-left: 0 !important;
	padding-right: 0 !important;
	max-width: 400px !important;
	width: auto;
	@media (max-width: 630px) {
		div {
			max-width: 80px !important;
		}
	}
`;
