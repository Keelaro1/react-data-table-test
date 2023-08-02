import { FetchDataOption } from '../../model/table.model';

export const getFullUrl = (selectedIndex: number) => {
	const url = 'http://www.filltext.com/';
	const smallDataPostfix =
		'?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';
	const bigDataPostfix =
		'?rows=1000&id={number|1000}&firstName={firstName}&delay=1&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';
	switch (selectedIndex) {
		case FetchDataOption.SMALL:
			return url + smallDataPostfix;
		case FetchDataOption.BIG:
			return url + bigDataPostfix;
		default:
			return;
	}
};
