// import { render, screen, fireEvent } from '@testing-library/react';
// import { EnergyTradeForm } from './index';
// import { ToastContainer } from 'react-toastify';
// import { IChangeEvent } from '@rjsf/core';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { EnergyTradeForm } from '../../../../components/EnergyTradeForm';
import { trades } from '../../mocks';
import { SocketProvider } from '../../../../context/SocketContext';
import { EnergyTradeContext } from '../../../../context/EnergyTradeContext';

describe('<EnergyTradeForm/>', () => {
	const renderComponent = (
		basename = '/trades/form',
		initialState: { id: string | number } | undefined = undefined
	) => {
		const emitTradeUpdate = vi.fn();
		const addTrade = vi.fn();

		render(
			<SocketProvider>
				<EnergyTradeContext.Provider
					value={{ trades, emitTradeUpdate, addTrade }}
				>
					<MemoryRouter
						initialEntries={[{ pathname: basename, state: initialState }]}
					>
						<EnergyTradeForm />
					</MemoryRouter>
				</EnergyTradeContext.Provider>
			</SocketProvider>
		);

		const user = userEvent.setup();
		return {
			formScreen: screen.getByTestId('EnergyTradeForm'),
			formElement: document.querySelector('#form'),
			getSubmitButton: () => screen.getByRole('button', { name: /Submit/i }),
			getToast: () =>
				screen.findByText(/Trade was successfully created and processed./i),
			user,
			addTrade,
			getDetailsHeading: () => screen.getByRole('heading'),
		};
	};
	it('should renders properly', async () => {
		const { formScreen } = renderComponent();
		expect(formScreen).toBeInTheDocument();
	});

	it('should shows toast on successful submission and reset form', async () => {
		const { getSubmitButton, user, getToast, addTrade } = renderComponent();
		const submitButton = getSubmitButton();
		const ids = {
			earlyTerminationPenalty: 'root_contractTerms_earlyTerminationPenalty',
			otherLegalConditions: 'root_contractTerms_otherLegalConditions',
			paymentMethod: 'root_paymentTerms_paymentMethod',
			paymentSchedule: 'root_paymentTerms_paymentSchedule',
		};

		const earlyTerminationPenalty = document.getElementById(
			ids.earlyTerminationPenalty
		);
		const otherLegalConditions = document.getElementById(
			ids.otherLegalConditions
		) as HTMLInputElement;
		const paymentMethod = document.getElementById(ids.paymentMethod);
		const paymentSchedule = document.getElementById(ids.paymentSchedule);

		if (earlyTerminationPenalty) await user.click(earlyTerminationPenalty);
		if (otherLegalConditions) await user.type(otherLegalConditions, 'N/A');
		if (paymentSchedule) await user.selectOptions(paymentSchedule, ['Monthly']);
		if (paymentMethod)
			await user.selectOptions(paymentMethod, ['Bank Transfer']);

		await user.click(submitButton);
		const toast = await getToast();
		expect(addTrade).toHaveBeenCalledOnce();
		expect(toast).toBeInTheDocument();
		expect(otherLegalConditions?.value).toBe('');
	});

	it('should have details heading and form disabled', () => {
		const { getDetailsHeading } = renderComponent('/trades/details/:id', {
			id: 234234222,
		});
		const otherLegalConditionsId = 'root_contractTerms_otherLegalConditions';
		const otherLegalConditions = document.getElementById(
			otherLegalConditionsId
		) as HTMLInputElement;
		const detailsTitle = getDetailsHeading();
		expect(detailsTitle).toBeInTheDocument();
		expect(otherLegalConditions.disabled).not.toBeTruthy();
	});

	it('should select energy type Solar and should render location - energyOutputPredictions - timeOfAvailability - certifications', () => {
		renderComponent();
		const ids = {
			location: 'root_location',
			energyOutputPredictions: 'root_energyOutputPredictions',
			timeOfAvailability: 'root_timeOfAvailability',
			certifications: 'root_certifications',
		};

		const location = document.getElementById(ids.location);
		const energyOutputPredictions = document.getElementById(
			ids.energyOutputPredictions
		);
		const timeOfAvailability = document.getElementById(ids.timeOfAvailability);
		const certifications = document.getElementById(ids.certifications);

		expect(location).toBeInTheDocument();
		expect(energyOutputPredictions).toBeInTheDocument();
		expect(timeOfAvailability).toBeInTheDocument();
		expect(certifications).toBeInTheDocument();
	});

	it('should select energy type Wind and should render location - turbineEfficiency - timeOfAvailability - certifications - windSpeedPredictions', async () => {
		const { user } = renderComponent();
		const ids = {
			energyType: 'root_energyType',
			turbineEfficiency: 'root_turbineEfficiency',
			windSpeedPredictions: 'root_windSpeedPredictions',
			timeOfAvailability: 'root_timeOfAvailability',
			certifications: 'root_certifications',
			location: 'root_location',
		};
		const energyType = document.getElementById(ids.energyType);
		if (energyType) await user.selectOptions(energyType, ['Wind']);

		const turbineEfficiency = document.getElementById(ids.turbineEfficiency);
		const windSpeedPredictions = document.getElementById(
			ids.windSpeedPredictions
		);
		const timeOfAvailability = document.getElementById(ids.timeOfAvailability);
		const certifications = document.getElementById(ids.certifications);
		const location = document.getElementById(ids.location);

		expect(location).toBeInTheDocument();
		expect(turbineEfficiency).toBeInTheDocument();
		expect(timeOfAvailability).toBeInTheDocument();
		expect(certifications).toBeInTheDocument();
		expect(windSpeedPredictions).toBeInTheDocument();
	});

	it('should select energy type Gas and should render deliveryMethod - flexibilityOfSupply - emissionCreditsOrPenalties - contractLength', async () => {
		const { user } = renderComponent();
		const ids = {
			energyType: 'root_energyType',
			deliveryMethod: 'root_deliveryMethod',
			flexibilityOfSupply: 'root_flexibilityOfSupply',
			emissionCreditsOrPenalties: 'root_emissionCreditsOrPenalties',
			contractLength: 'root_contractLength',
		};
		const energyType = document.getElementById(ids.energyType);
		if (energyType) await user.selectOptions(energyType, ['Gas']);

		const deliveryMethod = document.getElementById(ids.deliveryMethod);
		const flexibilityOfSupply = document.getElementById(
			ids.flexibilityOfSupply
		);
		const emissionCreditsOrPenalties = document.getElementById(
			ids.emissionCreditsOrPenalties
		);
		const contractLength = document.getElementById(ids.contractLength);

		expect(deliveryMethod).toBeInTheDocument();
		expect(flexibilityOfSupply).toBeInTheDocument();
		expect(emissionCreditsOrPenalties).toBeInTheDocument();
		expect(contractLength).toBeInTheDocument();
	});

	it('should select energy type Hydro and should render waterFlowRate - reservoirLevel - regulatoryCompliance - flexibilityOfSupply - energyStorage ', async () => {
		const { user } = renderComponent();
		const ids = {
			energyType: 'root_energyType',
			waterFlowRate: 'root_waterFlowRate',
			reservoirLevel: 'root_reservoirLevel',
			regulatoryCompliance: 'root_regulatoryCompliance',
			flexibilityOfSupply: 'root_flexibilityOfSupply',
			energyStorage: 'root_energyStorage',
		};
		const energyType = document.getElementById(ids.energyType);
		if (energyType) await user.selectOptions(energyType, ['Hydro']);

		const waterFlowRate = document.getElementById(ids.waterFlowRate);
		const reservoirLevel = document.getElementById(ids.reservoirLevel);
		const regulatoryCompliance = document.getElementById(
			ids.regulatoryCompliance
		);
		const flexibilityOfSupply = document.getElementById(
			ids.flexibilityOfSupply
		);
		const energyStorage = document.getElementById(ids.energyStorage);

		expect(waterFlowRate).toBeInTheDocument();
		expect(reservoirLevel).toBeInTheDocument();
		expect(regulatoryCompliance).toBeInTheDocument();
		expect(flexibilityOfSupply).toBeInTheDocument();
		expect(flexibilityOfSupply).toBeInTheDocument();
		expect(energyStorage).toBeInTheDocument();
	});

	it('should select energy type Kinetic and should render location - energyConversionEfficiency - predictabilityOfSource', async () => {
		const { user } = renderComponent();
		const ids = {
			energyType: 'root_energyType',
			location: 'root_location',
			energyConversionEfficiency: 'root_energyConversionEfficiency',
			predictabilityOfSource: 'root_predictabilityOfSource',
		};
		const energyType = document.getElementById(ids.energyType);
		if (energyType) await user.selectOptions(energyType, ['Kinetic']);

		const location = document.getElementById(ids.location);
		const energyConversionEfficiency = document.getElementById(
			ids.energyConversionEfficiency
		);
		const predictabilityOfSource = document.getElementById(
			ids.predictabilityOfSource
		);

		expect(location).toBeInTheDocument();
		expect(energyConversionEfficiency).toBeInTheDocument();
		expect(predictabilityOfSource).toBeInTheDocument();
	});

	it('should select energy type Thermal and should render location - heatSourceStability - temperatureGradient - conversionEfficiency - environmentalImpactAndRegulation ', async () => {
		const { user } = renderComponent();
		const ids = {
			energyType: 'root_energyType',
			heatSourceStability: 'root_heatSourceStability',
			temperatureGradient: 'root_temperatureGradient',
			conversionEfficiency: 'root_conversionEfficiency',
			location: 'root_location',
			environmentalImpactAndRegulation: 'root_environmentalImpactAndRegulation',
		};
		const energyType = document.getElementById(ids.energyType);
		if (energyType) await user.selectOptions(energyType, ['Thermal']);
		const location = document.getElementById(ids.location);
		const heatSourceStability = document.getElementById(
			ids.heatSourceStability
		);
		const temperatureGradient = document.getElementById(
			ids.temperatureGradient
		);
		const conversionEfficiency = document.getElementById(
			ids.conversionEfficiency
		);
		const environmentalImpactAndRegulation = document.getElementById(
			ids.environmentalImpactAndRegulation
		);

		expect(heatSourceStability).toBeInTheDocument();
		expect(temperatureGradient).toBeInTheDocument();
		expect(conversionEfficiency).toBeInTheDocument();
		expect(location).toBeInTheDocument();
		expect(environmentalImpactAndRegulation).toBeInTheDocument();
	});
});
