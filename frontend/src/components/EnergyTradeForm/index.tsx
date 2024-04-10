import React, { useRef } from 'react';
import Form, { IChangeEvent } from '@rjsf/core';
import { useLocation } from 'react-router-dom';
import validator from '@rjsf/validator-ajv8';
import { toast, ToastContainer } from 'react-toastify';
import { formSchema } from '../../schemas/form';
import { useEnergyTrade } from '../../context/EnergyTradeContext';
import { createTrade, getFormHeader, getUpdatedUiSchema } from '../../utils';
import 'react-toastify/dist/ReactToastify.css';

/**
 * EnergyTradeForm is a functional component that renders a form for trading energy.
 *
 * @returns {React.ReactElement} The rendered EnergyTradeForm component.
 * @example
 * <EnergyTradeForm />
 */
export const EnergyTradeForm = (): React.ReactElement => {
	const formRef = useRef<Form>(null);
	const locationState = useLocation().state;
	const locationId = locationState?.id;

	const { addTrade, trades } = useEnergyTrade();
	const tradeData = trades.find((trade) => trade.id === locationId);

	const resetForm = () => formRef?.current?.reset();

	const onSubmit = (data: IChangeEvent) => {
		addTrade(createTrade(data));
		toast.success('Trade was successfully created and processed.');
		resetForm();
	};

	const formHeader = getFormHeader(locationId);
	const updatedUiSchema = getUpdatedUiSchema(locationId);

	return (
		<div
			data-testid='EnergyTradeForm'
			className='flex justify-center mt-20 mb-10'
		>
			<div className='w-3-10'>
				<ToastContainer
					position='top-right'
					autoClose={3000}
					hideProgressBar
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
				/>
				<h1 className='mb-5'>{formHeader}</h1>{' '}
				<Form
					id='form'
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
