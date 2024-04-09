import React, { useContext } from 'react';
import { io } from 'socket.io-client';
import { API_BASE_URL } from '../../utils';

const socket = io(API_BASE_URL);

const SocketContext = React.createContext(socket);

export const SocketProvider = ({ children }: ProviderProps) => {
	return (
		<SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
	);
};
export function useSocket() {
	const context = useContext(SocketContext);

	if (context === undefined) {
		throw new Error('useSocket must be used within an SocketProvider');
	}

	return context;
}
