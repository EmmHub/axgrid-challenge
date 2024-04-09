import Form, { IChangeEvent } from '@rjsf/core';
import { useLocation } from 'react-router-dom';
import validator from '@rjsf/validator-ajv8';
import { useRef } from 'react';
import { formSchema } from '../../schemas/form';
import { useEnergyTrade } from '../../context/EnergyTradeContext';
import { createTrade, getFormHeader, getUpdatedUiSchema } from '../../utils';

export const EnergyTradeForm = () => {
	const formRef = useRef<Form>(null);
	const locationState = useLocation().state;
	const locationId = locationState?.id;

	const { addTrade, trades } = useEnergyTrade();
	const tradeData = trades.find((trade) => trade.id === locationId);

	const resetForm = () => formRef?.current?.reset();

	const onSubmit = (data: IChangeEvent) => {
		addTrade(createTrade(data));
		resetForm();
	};

	const formHeader = getFormHeader(locationId);
	const updatedUiSchema = getUpdatedUiSchema(locationId);

	return (
		<div className='flex justify-center mt-20 mb-10'>
			<div className='w-3-10'>
				<h1 className='mb-5'>{formHeader}</h1>{' '}
				<Form
					schema={formSchema}
					uiSchema={updatedUiSchema}
					validator={validator}
					onSubmit={onSubmit}
					formData={tradeData}
					ref={formRef}
				/>
			</div>
		</div>
	);
};
