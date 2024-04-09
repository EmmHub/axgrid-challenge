import {
	enumSchema,
	numberSchema,
	propertiesSchema,
	supplyLevel,
} from '../../../../utils';
import { locationSchema } from '../../../commons/location';

export const thermalSchema = propertiesSchema('Thermal', {
	heatSourceStability: enumSchema(
		'Heat Source Stability',
		supplyLevel,
		'The stability of the heat source.'
	),
	temperatureGradient: numberSchema(
		'Temperature Gradient',
		'Temperature difference.'
	),
	conversionEfficiency: numberSchema(
		'Conversion Efficiency',
		'Efficiency of thermal energy conversion.'
	),
	location: locationSchema,
	environmentalImpactAndRegulation: enumSchema(
		'Environmental Impact and Regulation',
		['low', 'medium', 'high'],
		'Regulations regarding heat extraction.'
	),
});
