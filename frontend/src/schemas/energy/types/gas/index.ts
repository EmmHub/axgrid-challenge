import {
	enumSchema,
	numberSchema,
	propertiesSchema,
	supplyLevel,
} from '../../../../utils';

export const gasSchema = propertiesSchema('Gas', {
	deliveryMethod: enumSchema(
		'Delivery Method',
		['pipeline', 'shipped'],
		'The method of energy delivery.'
	),
	flexibilityOfSupply: enumSchema(
		'Flexibility of Supply',
		supplyLevel,
		'Gas plant flexibility.'
	),
	emissionCreditsOrPenalties: enumSchema(
		'Emission Credits or Penalties',
		['credits', 'penalties'],
		'Emission costs and credit availability.'
	),
	contractLength: numberSchema(
		'Contract Length',
		'The duration of contracts for gas trades.'
	),
});
