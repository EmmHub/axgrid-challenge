import { enumSchema, propertiesSchema, supplyLevel } from '../../../../utils';
import { locationSchema } from '../../../commons/location';
import { certificationsSchema } from '../../../commons/certifications';

export const solarSchema = propertiesSchema('Solar', {
	location: locationSchema,
	energyOutputPredictions: enumSchema(
		'Energy Output Predictions',
		supplyLevel,
		'Predictions of energy output based on historical data and weather forecasts'
	),
	timeOfAvailability: enumSchema(
		'Time of Availability',
		['day', 'night'],
		'The time frame during which solar energy is primarily available.'
	),
	certifications: certificationsSchema,
});
