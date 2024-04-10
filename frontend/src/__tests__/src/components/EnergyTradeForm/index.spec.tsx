import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { EnergyTradeForm } from '../../../../components/EnergyTradeForm';
import { energyTypesWithFields, trades } from '../../mocks';
import { SocketProvider } from '../../../../context/SocketContext';
import { EnergyTradeContext } from '../../../../context/EnergyTradeContext';

describe('<EnergyTradeForm/>', () => {
	const setup = async (
		route = '/trades/form',
		state: { id: number } | undefined = undefined
	) => {
		const addTrade = vi.fn();
		const utils = render(
			<SocketProvider>
				<EnergyTradeContext.Provider
					value={{ trades, emitTradeUpdate: vi.fn(), addTrade }}
				>
					<MemoryRouter initialEntries={[{ pathname: route, state }]}>
						<EnergyTradeForm />
					</MemoryRouter>
				</EnergyTradeContext.Provider>
			</SocketProvider>
		);
		const user = userEvent.setup();
		return {
			...utils,
			user,
			getToast: () =>
				screen.findByText(/Trade was successfully created and processed./i),
			addTrade,
		};
	};

	const testEnergyTypeFields = async (
		energyType: string,
		expectedFields: Array<string>
	) => {
		const { user } = await setup();
		const energyTypeElement = document.getElementById('root_energyType');
		if (energyTypeElement) {
			await user.selectOptions(energyTypeElement, energyType);
		}
		expectedFields.forEach((field) => {
			const fieldElement = document.getElementById(field);
			expect(fieldElement).toBeInTheDocument();
		});
	};

	it('renders properly', async () => {
		await setup();
		expect(screen.getByTestId('EnergyTradeForm')).toBeInTheDocument();
	});

	it('should show toast on successful submission and reset form', async () => {
		const { user, getToast, addTrade } = await setup();
		const formFields = {
			root_contractTerms_earlyTerminationPenalty: async (
				element: HTMLElement
			) => user.click(element),
			root_contractTerms_otherLegalConditions: async (element: HTMLElement) =>
				user.type(element, 'N/A'),
			root_paymentTerms_paymentMethod: async (element: HTMLElement) =>
				user.selectOptions(element, ['Bank Transfer']),
			root_paymentTerms_paymentSchedule: async (element: HTMLElement) =>
				user.selectOptions(element, ['Monthly']),
		};

		const interactWithFormField = async (
			id: string,
			action: (element: HTMLElement) => Promise<void>
		) => {
			const element = document.getElementById(id);
			if (element) {
				await action(element);
			}
		};

		// eslint-disable-next-line no-restricted-syntax
		for (const [id, action] of Object.entries(formFields)) {
			// eslint-disable-next-line no-await-in-loop
			await interactWithFormField(id, action);
		}

		await user.click(screen.getByRole('button', { name: /Submit/i }));

		const toast = await getToast();
		expect(addTrade).toHaveBeenCalledOnce();
		expect(toast).toBeInTheDocument();
		const otherLegalConditions = document.getElementById(
			'root_contractTerms_otherLegalConditions'
		) as HTMLInputElement;
		expect(otherLegalConditions.value).toBe('');
	});

	it('has details heading and form disabled for details view', async () => {
		await setup('/trades/details/:id', { id: 234234222 });
		expect(screen.getByRole('heading')).toBeInTheDocument();
		const otherLegalConditions = document.getElementById(
			'root_contractTerms_otherLegalConditions'
		) as HTMLInputElement;
		expect(otherLegalConditions.disabled).toBeFalsy();
	});

	energyTypesWithFields.forEach(({ type, fields }) => {
		it(`selects energy type ${type} and renders specific fields`, async () => {
			await testEnergyTypeFields(type, fields);
		});
	});
});
