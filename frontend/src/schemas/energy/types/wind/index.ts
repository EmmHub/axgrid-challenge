import {
	enumSchema,
	numberSchema,
	propertiesSchema,
	supplyLevel,
} from '../../../../utils';
import { certificationsSchema } from '../../../commons/certifications';
import { locationSchema } from '../../../commons/location';

export const windSchema = propertiesSchema('Wind', {
	turbineEfficiency: numberSchema(
		'Turbine Efficiency',
		'Wind turbine efficiency.'
	),
	windSpeedPredictions: enumSchema(
		'Wind Speed Predictions',
		supplyLevel,
		'Forecasts of wind speeds.'
	),
	timeOfAvailability: enumSchema(
		'Time of Availability',
		supplyLevel,
		'Wind energy availability varies with time and weather'
	),
	location: locationSchema,
	certifications: certificationsSchema,
});
