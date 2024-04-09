import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { EnergyTradeProvider } from './context/EnergyTradeContext';
import { SocketProvider } from './context/SocketContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<SocketProvider>
			<EnergyTradeProvider>
				<App />
			</EnergyTradeProvider>
		</SocketProvider>
	</React.StrictMode>
);
