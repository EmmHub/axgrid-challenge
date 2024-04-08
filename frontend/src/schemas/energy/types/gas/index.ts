import {
	enumSchema,
	numberSchema,
	propertiesSchema,
	supplyLevel,
} from '../../../../utils';

export const gasSchema = propertiesSchema('Gas', {
	delivery_method: enumSchema(
		'Delivery Method',
		['pipeline', 'shipped'],
		'The method of energy delivery.'
	),
	flexibility_of_supply: enumSchema(
		'Flexibility of Supply',
		supplyLevel,
		'The ability of gas plants to quickly adjust output to meet demand.'
	),
	emission_credits_or_penalties: enumSchema(
		'Emission Credits or Penalties',
		['credits', 'penalties'],
		'Details on the cost of emissions or availability of emission credits.'
	),
	contract_length: numberSchema(
		'Contract Length',
		'The duration of contracts for gas trades.'
	),
});
