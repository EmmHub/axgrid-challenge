import {
	enumSchema,
	numberSchema,
	propertiesSchema,
	supplyLevel,
} from '../../../../utils';

export const hydroSchema = propertiesSchema('Hydro', {
	waterFlowRate: numberSchema(
		'Water Flow Rate',
		'Water availability for energy production.'
	),
	reservoirLevel: enumSchema(
		'Reservoir Level',
		supplyLevel,
		'The level of the water in the reservoir.'
	),
	regulatoryCompliance: enumSchema(
		'Regulatory Compliance',
		['Yes', 'No'],
		'Compliance with water regulations.'
	),
	flexibilityOfSupply: enumSchema(
		'Flexibility of Supply',
		supplyLevel,
		'Ability to adjust output based on demand.'
	),
	energyStorage: enumSchema(
		'Energy Storage',
		supplyLevel,
		'The capacity to store energy'
	),
});
