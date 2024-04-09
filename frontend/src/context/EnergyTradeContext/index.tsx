import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { useSocket } from '../SocketContext';

export const EnergyTradeContext = createContext<Values | undefined>(undefined);

export const EnergyTradeProvider = ({ children }: ProviderProps) => {
	const socket = useSocket();
	const [trades, setTrades] = useState<Trades | []>([]);
	const handleTrade = (data: Trades) => {
		setTrades(data);
	};
	useEffect(() => {
		socket.on('trades', handleTrade);

		return () => {
			socket.off('tradeUpdate', handleTrade);
		};
	}, [socket]);

	const addTrade = useCallback(
		(newTrade: Trade) => {
			socket.emit('addTrade', newTrade);
		},
		[socket]
	);

	const emitTradeUpdate = useCallback(
		(id: string | number) => {
			socket.emit('tradeUpdate', id);
		},
		[socket]
	);

	const values: Values = useMemo(
		() => ({
			trades,
			addTrade,
			emitTradeUpdate,
		}),
		[trades, addTrade, emitTradeUpdate]
	);

	return (
		<EnergyTradeContext.Provider value={values}>
			{children}
		</EnergyTradeContext.Provider>
	);
};

export function useEnergyTrade(): Values {
	const context = useContext<Values | undefined>(EnergyTradeContext);

	if (context === undefined) {
		throw new Error(
			'useEnergyTrade must be used within an EnergyTradeProvider'
		);
	}

	return context;
}
