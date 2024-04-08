import {
	enumSchema,
	numberSchema,
	propertiesSchema,
	supplyLevel,
} from '../../../../utils';

export const hydroSchema = propertiesSchema('Hydro', {
	water_flow_rate: numberSchema(
		'Water Flow Rate',
		'The rate at which water is available for energy production.'
	),
	reservoir_level: enumSchema(
		'Reservoir Level',
		supplyLevel,
		'The level of the water in the reservoir.'
	),
	regulatory_compliance: enumSchema(
		'Regulatory Compliance',
		['Yes', 'No'],
		'Compliance with water regulations.'
	),
	flexibility_of_supply: enumSchema(
		'Flexibility of Supply',
		supplyLevel,
		'Ability to adjust output based on demand.'
	),
	energy_storage: enumSchema(
		'Energy Storage',
		supplyLevel,
		'The capacity to store energy'
	),
});
