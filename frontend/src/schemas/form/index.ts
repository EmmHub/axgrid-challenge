import { energyTypes, generateSchema } from '../../utils';
import { locationSchema } from '../commons/location';
import { termsSchema } from '../terms';
import { solarSchema } from '../energy/types/solar';
import { gasSchema } from '../energy/types/gas';
import { windSchema } from '../energy/types/wind';
import { hydroSchema } from '../energy/types/hydro';
import { kineticSchema } from '../energy/types/kinetic';
import { thermalSchema } from '../energy/types/thermal';

export const formSchema = generateSchema('object', '', {
	properties: {
		energy_type: generateSchema('string', 'Energy type', {
			enum: energyTypes,
			default: energyTypes[0],
			description: 'The type of energy source used.',
		}),
		price: generateSchema('number', 'Price', {
			description: 'The price per unit of energy.',
		}),
		minimum_purchase_quantity: generateSchema(
			'number',
			'Minimum Purchase Quantity',
			{ description: 'The minimum amount of energy a buyer must purchase.' }
		),
		terms: termsSchema,
		location: locationSchema,
	},
	dependencies: {
		energy_type: {
			oneOf: [
				{ ...solarSchema },
				{ ...gasSchema },
				{ ...windSchema },
				{ ...hydroSchema },
				{ ...kineticSchema },
				{ ...thermalSchema },
			],
		},
	},
});
