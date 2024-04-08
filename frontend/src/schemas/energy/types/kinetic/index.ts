import {
	enumSchema,
	numberSchema,
	propertiesSchema,
	supplyLevel,
} from '../../../../utils';

export const kineticSchema = propertiesSchema('Kinetic', {
	energy_conversion_efficiency: numberSchema(
		'Energy Conversion Efficiency',
		'The efficiency of the energy conversion.'
	),
	predictability_of_source: enumSchema(
		'Predictability of Source',
		supplyLevel,
		'Predictability of the energy source.'
	),
});
