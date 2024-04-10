import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { EnergyTradesTable } from '../../../../components/EnergyTradesTable';
import { convertToTableFormat, getTradesColumns } from '../../../../utils';
import { trades } from '../../mocks';

describe('EnergyTradesTable', () => {
	const emitTradeUpdate = vi.fn();
	const mockData = convertToTableFormat(trades);
	const mockColumns = getTradesColumns(emitTradeUpdate);
	const renderComponent = () => {
		render(
			<MemoryRouter>
				<EnergyTradesTable data={mockData} columns={mockColumns} />
			</MemoryRouter>
		);
		const headerRow = screen.getByRole('row', { name: /Solar/i });
		return {
			table: screen.getByTestId('EnergyTradesTable'),
			rows: screen.getAllByRole('row'),
			cols: within(headerRow).getAllByRole('cell'),
		};
	};
	it('renders EnergyTradesTable', () => {
		const { table } = renderComponent();
		expect(table).toBeInTheDocument();
	});

	it('renders the correct number of rows', () => {
		const { rows } = renderComponent();
		expect(rows.length).toBe(mockData.length + 1);
	});

	it('renders the correct number of columns', () => {
		const { cols } = renderComponent();
		expect(cols.length).toBe(mockColumns.length);
	});
});
