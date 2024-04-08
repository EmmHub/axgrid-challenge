import {
	enumSchema,
	numberSchema,
	propertiesSchema,
	supplyLevel,
} from '../../../../utils';

export const thermalSchema = propertiesSchema('Thermal', {
	heat_source_stability: enumSchema(
		'Heat Source Stability',
		supplyLevel,
		'The stability of the heat source.'
	),
	temperature_gradient: numberSchema(
		'Temperature Gradient',
		'The temperature difference for energy production.'
	),
	conversion_efficiency: numberSchema(
		'Conversion Efficiency',
		'Efficiency of thermal energy conversion.'
	),
	environmental_impact_and_regulation: enumSchema(
		'Environmental Impact and Regulation',
		['low', 'medium', 'high'],
		'Regulations regarding heat extraction.'
	),
});
