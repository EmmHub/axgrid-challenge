import { energyTypes, generateSchema, numberSchema } from '../../utils';
import { solarSchema } from '../energy/types/solar';
import { gasSchema } from '../energy/types/gas';
import { windSchema } from '../energy/types/wind';
import { hydroSchema } from '../energy/types/hydro';
import { kineticSchema } from '../energy/types/kinetic';
import { thermalSchema } from '../energy/types/thermal';
import { contractTermsSchema, paymentTermsSchema } from '../terms';

export const formSchema = generateSchema('object', '', {
	properties: {
		energyType: generateSchema('string', 'Energy type', {
			enum: energyTypes,
			default: energyTypes[0],
			description: 'The type of energy source used.',
		}),
		price: generateSchema('number', 'Price', {
			description: 'The price per unit of energy.',
			minimum: 1,
			maximum: 100,
			default: 1,
		}),
		minimumPurchaseQuantity: generateSchema(
			'number',
			'Minimum Purchase Quantity',
			{
				description: 'The minimum amount of energy a buyer must purchase.',
				minimum: 1,
				maximum: 100,
				default: 1,
			}
		),
		capacity: numberSchema(
			'Capacity',
			'The maximum power output the solar installation can produce.',
			{ minimum: 1, maximum: 100, default: 1 }
		),
		contractTerms: contractTermsSchema,
		paymentTerms: paymentTermsSchema,
	},
	dependencies: {
		energyType: {
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
	required: ['energyType', 'price', 'minimumPurchaseQuantity'],
});
