import { Link } from 'react-router-dom';
import { Column } from 'react-table';
import { IChangeEvent } from '@rjsf/core';
import { uiSchema } from '../schemas/ui';

export const API_BASE_URL = 'http://localhost:5000';

export const generateSchema = (
	type: string,
	title: string,
	additionalProperties: any = {}
) => {
	return {
		type,
		title,
		...additionalProperties,
	};
};

export const supplyLevel = ['low', 'medium', 'high'];

export const energyTypes = [
	'Solar',
	'Gas',
	'Wind',
	'Hydro',
	'Kinetic',
	'Thermal',
];

export const enumSchema = (
	title: string,
	enumOpt: string[],
	description: string,
	defaultValue = enumOpt[0]
) => {
	return generateSchema('string', title, {
		enum: enumOpt,
		default: defaultValue,
		description,
	});
};

export const numberSchema = (
	title: string,
	description: string,
	...rest: any
) => {
	return generateSchema('number', title, { description, ...rest });
};

export const propertiesSchema = (energyType: string, properties: any) => ({
	properties: { energyType: { enum: [energyType] }, ...properties },
});

export function uid() {
	return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

export const convertToTableFormat = (tradeData: Trades): TableFormat[] =>
	tradeData.map((trade: Trade) => ({
		EnergyType: trade.energyType,
		Price: trade.price,
		MinimumPurchaseQuantity: trade.minimumPurchaseQuantity,
		EnergyOutputPredictions: trade.energyOutputPredictions,
		TimeOfAvailability: trade.timeOfAvailability,
		ContractDuration: `${trade.contractTerms.durationAmount} ${trade.contractTerms.durationType}`,
		ContractConditions: trade.contractTerms.otherLegalConditions,
		EarlyTerminationPenalty: trade.contractTerms.earlyTerminationPenalty,
		PaymentMethod: trade.paymentTerms.paymentMethod,
		PaymentSchedule: trade.paymentTerms.paymentSchedule,
		Status: trade.status,
		TradeId: trade.id,
		Details: '',
	}));

const TradeConfirmationCell = ({ value, handleClick }: ITradeCell) => (
	<button className='button-link' type='button' onClick={handleClick(value)}>
		Confirm
	</button>
);

const makeTradeDetailsCell = ({ row }: CellOriginalType) => (
	<Link
		to={`/trades/details/${row?.original.TradeId}`}
		state={{ id: row?.original.TradeId }}
		className='nav-link-table'
	>
		More
	</Link>
);

export const getTradesColumns = (
	emitTradeUpdate: (id: string | number) => void
): Column<TableFormat>[] => [
	{
		Header: 'Energy Type',
		accessor: 'EnergyType',
	},
	{
		Header: 'Energy Output Predictions',
		accessor: 'EnergyOutputPredictions',
	},
	{
		Header: 'Time Of Availability',
		accessor: 'TimeOfAvailability',
	},
	{ Header: 'Price', accessor: 'Price' },
	{
		Header: 'Minimum Purchase Quantity',
		accessor: 'MinimumPurchaseQuantity',
	},
	{
		Header: 'Contract Duration',
		accessor: 'ContractDuration',
	},
	{
		Header: 'Contract Conditions',
		accessor: 'ContractConditions',
	},
	{
		Header: 'Early Termination Penalty',
		accessor: 'EarlyTerminationPenalty',
		Cell: ({ value }: { value: boolean }) => {
			return <input type='checkbox' checked={value} readOnly />;
		},
	},
	{ Header: 'Payment Method', accessor: 'PaymentMethod' },
	{ Header: 'Payment Schedule', accessor: 'PaymentSchedule' },
	{ Header: 'Status', accessor: 'Status' as const },
	{
		Header: 'Confirm Trade',
		accessor: 'TradeId',
		Cell: (props) => {
			const handleClick = (value: string | number) => () => {
				emitTradeUpdate(value);
			};
			return <TradeConfirmationCell {...props} handleClick={handleClick} />;
		},
	},
	{
		Header: 'Details',
		accessor: 'Details',
		Cell: makeTradeDetailsCell,
	},
];

export const getFormHeader = (locationId: string | undefined) =>
	locationId ? `Transaction Details / ${locationId}` : 'Create New Transaction';

export const getUpdatedUiSchema = (locationId: string | undefined) => ({
	...uiSchema,
	'ui:readonly': !!locationId,
	'ui:submitButtonOptions': {
		norender: !!locationId,
	},
});

export const createTrade = (data: IChangeEvent) => {
	return { ...data.formData, status: 'created', id: uid() };
};
