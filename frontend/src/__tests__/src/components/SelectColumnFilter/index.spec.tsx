import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SelectColumnFilter } from '../../../../components/SelectColumnFilter';

describe('<SelectColumnFilter/>', () => {
	const setFilter = vi.fn();
	const props = {
		column: {
			filterValue: '',
			setFilter,
			preFilteredRows: [{ values: { row1: 'row1' } }],
			id: 'row1',
		},
	};
	const renderComponent = () => {
		render(<SelectColumnFilter {...props} />);
		const user = userEvent.setup();
		return {
			optAll: screen.getByText('All'),
			select: screen.getByRole('combobox'),
			user,
		};
	};

	it('renders the SelectColumnFilter component', () => {
		const { optAll } = renderComponent();
		expect(optAll).toBeInTheDocument();
	});

	it('updates the filter value when an option is selected', async () => {
		const { select, user } = renderComponent();

		await user.selectOptions(select, ['row1']);
		expect(setFilter).toHaveBeenCalledWith('row1');
	});
});
