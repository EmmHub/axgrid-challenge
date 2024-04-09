import {
	BrowserRouter as Router,
	Navigate,
	Route,
	Routes,
} from 'react-router-dom';
import { EnergyTradeForm } from './components/EnergyTradeForm';
import { EnergyTradesTable } from './components/EnergyTradesTable';
import { useEnergyTrade } from './context/EnergyTradeContext';
import { NavigationBar } from './components/NavigationBar';
import { convertToTableFormat, getTradesColumns } from './utils';

function App() {
	const { trades, emitTradeUpdate } = useEnergyTrade();
	const data = convertToTableFormat(trades) || [];
	const columns = getTradesColumns(emitTradeUpdate) || [];

	return (
		<Router>
			<NavigationBar />
			<Routes>
				<Route path='/trades/form' element={<EnergyTradeForm />} />
				<Route path='/trades/details/:id' element={<EnergyTradeForm />} />
				<Route
					path='/trades/results'
					element={<EnergyTradesTable columns={columns} data={data} />}
				/>
				<Route path='/' element={<Navigate to='/trades/form' />} />
			</Routes>
		</Router>
	);
}

export default App;
