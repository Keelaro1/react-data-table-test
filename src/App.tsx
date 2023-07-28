import React, { memo, useCallback, useState } from 'react';
import { TableData } from './model/table.model';
import { FetchButtonsComponent } from './components/fetch-buttons/fetch-buttons';
import { TableComponent } from './components/table/table';

interface AppContextType {
	readonly data: TableData[];
}

export const AppContext = React.createContext<AppContextType>({ data: [] });

const App = memo(() => {
	const [data, setData] = useState<TableData[]>([]);
	const loadData = useCallback((data: TableData[]) => setData(data), []);

	return (
		<AppContext.Provider value={{ data }}>
			<FetchButtonsComponent loadData={loadData} />
			{data.length > 0 && <TableComponent />}
		</AppContext.Provider>
	);
});

App.displayName = 'App';

export default App;
