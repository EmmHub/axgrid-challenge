import {
	enumSchema,
	numberSchema,
	propertiesSchema,
	supplyLevel,
} from '../../../../utils';
import { certificationsSchema } from '../../../commons/certifications';

export const windSchema = propertiesSchema('Wind', {
	wind_speed_predictions: enumSchema(
		'Wind Speed Predictions',
		supplyLevel,
		'Forecasts of wind speeds.'
	),
	turbine_efficiency: numberSchema(
		'Turbine Efficiency',
		'The efficiency of the turbines in converting wind energy.'
	),
	time_of_availability: enumSchema(
		'Time of Availability',
		supplyLevel,
		'Wind energy availability varies with time and weather'
	),
	certifications: certificationsSchema,
});
