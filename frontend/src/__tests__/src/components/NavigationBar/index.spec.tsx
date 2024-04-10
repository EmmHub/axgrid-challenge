import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { NavigationBar } from '../../../../components/NavigationBar';

describe('NavigationBar', () => {
	const renderComponent = () => {
		render(
			<BrowserRouter>
				<NavigationBar />
			</BrowserRouter>
		);
		return {
			linkTradeForm: screen.getByText(/Trades Form/i),
			linkTradeResults: screen.getByText(/Trades Results/i),
		};
	};
	it('renders without crashing', () => {
		const { linkTradeForm, linkTradeResults } = renderComponent();
		expect(linkTradeForm).toBeInTheDocument();
		expect(linkTradeResults).toBeInTheDocument();
	});

	it('has valid links', () => {
		const { linkTradeForm, linkTradeResults } = renderComponent();
		expect(linkTradeForm.closest('a')).toHaveAttribute('href', '/trades/form');
		expect(linkTradeResults.closest('a')).toHaveAttribute(
			'href',
			'/trades/results'
		);
	});
});
