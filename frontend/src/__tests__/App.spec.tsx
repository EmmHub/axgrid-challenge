import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect } from 'vitest';
import App from '../App';
import { EnergyTradeContext } from '../context/EnergyTradeContext';
import { SocketProvider } from '../context/SocketContext';
import { trades } from './src/mocks';

describe('<App />', () => {
	const renderComponent = () => {
		const emitTradeUpdate = vi.fn();
		render(
			<SocketProvider>
				<EnergyTradeContext.Provider
					value={{ trades, emitTradeUpdate, addTrade: vi.fn() }}
				>
					<App />
				</EnergyTradeContext.Provider>
			</SocketProvider>
		);
		const user = userEvent.setup();
		const getters = {
			getLinkInCell: () => screen.getAllByRole('link', { name: /more/i }),
			getConfirmInCell: () =>
				screen.getAllByRole('button', { name: /Confirm/i }),
			getCreatedInCell: () => screen.getAllByRole('cell', { name: /created/i }),
			getDetailsHeading: () => screen.getByRole('heading'),
			getTableElement: () => screen.getByTestId('EnergyTradesTable'),
			getFormElement: () => screen.getByTestId('EnergyTradeForm'),
		};

		return {
			navBarElement: screen.getByRole('navigation'),
			tradeResult: screen.getByRole('link', { name: /Trades Results/i }),
			...getters,
			user,
			emitTradeUpdate,
		};
	};
	it('renders the navigation bar', () => {
		const { navBarElement } = renderComponent();
		expect(navBarElement).toBeInTheDocument();
	});

	it("navigates to trades form route when '/trades/form' is visited", () => {
		const { getFormElement } = renderComponent();
		const formElement = getFormElement();
		expect(formElement).toBeInTheDocument();
	});

	it("navigates to trades details route when '/trades/details/:id' is visited", async () => {
		const { getLinkInCell, user, tradeResult, getDetailsHeading } =
			renderComponent();
		await user.click(tradeResult);
		const [linkInCell] = getLinkInCell();

		await user.click(linkInCell);
		const detailsTitle = getDetailsHeading();
		expect(detailsTitle).toBeInTheDocument();
	});

	it("navigates to trades results route when '/trades/results' is visited", async () => {
		const { getTableElement, user, tradeResult } = renderComponent();

		await user.click(tradeResult);
		const tableElement = getTableElement();
		expect(tableElement).toBeInTheDocument();
	});

	it('Navigates to the trade results. Performs an update on a trade status, changing it from "created" to "accepted".', async () => {
		const {
			emitTradeUpdate,
			getConfirmInCell,
			user,
			tradeResult,
			getCreatedInCell,
		} = renderComponent();
		await user.click(tradeResult);
		const [createCell] = getCreatedInCell();
		expect(createCell).toHaveTextContent('created');
		const [confirmCell] = getConfirmInCell();
		await user.click(confirmCell);
		expect(emitTradeUpdate).toHaveBeenCalledOnce();
	});
});
