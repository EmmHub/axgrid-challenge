import {
	enumSchema,
	numberSchema,
	propertiesSchema,
	supplyLevel,
} from '../../../../utils';
import { locationSchema } from '../../../commons/location';

export const kineticSchema = propertiesSchema('Kinetic', {
	location: locationSchema,
	energyConversionEfficiency: numberSchema(
		'Energy Conversion Efficiency',
		'The efficiency of the energy conversion.'
	),
	predictabilityOfSource: enumSchema(
		'Predictability of Source',
		supplyLevel,
		'Predictability of the energy source.'
	),
});
