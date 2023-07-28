import React, { useCallback, useState } from 'react';
import { TableData } from './model/table.model';
import { TableComponent } from './components/table/Table';
import { FetchButtonsComponent } from './components/fetch-buttons/FetchButtons';

const App = () => {
	const [data, setData] = useState<TableData | null>(null);
	const loadData = useCallback((data: TableData) => setData(data), []);

	return (
		<>
			<FetchButtonsComponent loadData={loadData} />
			{data && <TableComponent data={data} />}
		</>
	);
};

export default App;
