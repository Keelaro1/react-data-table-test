import React, { memo, useCallback, useState } from 'react';
import { TableData } from './model/table.model';
import { FetchButtons } from './components/fetch-buttons/fetch-buttons';
import { TableComponent } from './components/table/table';

export const App = memo(() => {
	const [data, setData] = useState<TableData[]>([]);
	const setFetchedData = useCallback((data: TableData[]) => setData(data), []);

	return (
		<>
			<FetchButtons setData={setFetchedData} />
			{data.length > 0 && <TableComponent initialData={data} />}
		</>
	);
});

App.displayName = 'App';
