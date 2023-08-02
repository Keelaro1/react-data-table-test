import React, { memo, useCallback, useState } from 'react';
import { TableData } from './model/table.model';
import { FetchButtons } from './components/fetch-buttons/fetch-buttons';
import { TableComponent } from './components/table/table';

interface AppContextType {
	readonly data: TableData[];
}

export const AppContext = React.createContext<AppContextType>({ data: [] });

export const App = memo(() => {
	const [data, setData] = useState<TableData[]>([]);
	const fetchData = useCallback((data: TableData[]) => setData(data), []);

	return (
		<AppContext.Provider value={{ data }}>
			<FetchButtons fetchData={fetchData} />
			{data.length > 0 && <TableComponent />}
		</AppContext.Provider>
	);
});

App.displayName = 'App';
