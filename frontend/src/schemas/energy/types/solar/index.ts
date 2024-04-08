import {
	enumSchema,
	numberSchema,
	propertiesSchema,
	supplyLevel,
} from '../../../../utils';
import { locationSchema } from '../../../commons/location';
import { certificationsSchema } from '../../../commons/certifications';

export const solarSchema = propertiesSchema('Solar', {
	capacity: numberSchema(
		'Capacity',
		'The maximum power output the solar installation can produce.'
	),
	location: locationSchema,
	energy_output_predictions: enumSchema(
		'Energy Output Predictions',
		supplyLevel,
		'Predictions of energy output based on historical data and weather forecasts'
	),
	time_of_availability: enumSchema(
		'Time of Availability',
		['day', 'night'],
		'The time frame during which solar energy is primarily available.'
	),
	certifications: certificationsSchema,
});
