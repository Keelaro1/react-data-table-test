export enum SortingOrder {
	ASCENDING = 'ascending',
	DESCENDING = 'descending',
}

export function sortArrayOfObjects<T>(array: Array<T>, propertyName: string, order: SortingOrder) {
	const sortedArr = array.sort((a: T, b: T) => {
		if (typeof a[propertyName as keyof T] === 'string' && typeof b[propertyName as keyof T] === 'string') {
			const aStr = a[propertyName as keyof T] as string;
			const bStr = b[propertyName as keyof T] as string;
			return aStr.localeCompare(bStr);
		}
		if (a[propertyName as keyof T] < b[propertyName as keyof T]) {
			return -1;
		}
		if (a[propertyName as keyof T] > b[propertyName as keyof T]) {
			return 1;
		}
		return 0;
	});

	if (order === 'descending') {
		return sortedArr.reverse();
	}
	
	return sortedArr;
}
