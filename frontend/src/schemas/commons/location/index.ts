import { generateSchema } from '../../../utils';

// export const locationSchema = {
// 	type: 'object',
// 	title: 'Location',
// 	description:
// 		'The geographical location of the energy installation, crucial for assessing energy production potential.',
// 	properties: {
// 		latitude: {
// 			type: 'number',
// 			title: 'Latitude',
// 		},
// 		longitude: {
// 			type: 'number',
// 			title: 'Longitude',
// 		},
// 	},
// };

export const locationSchema = generateSchema('object', 'Location', {
	description:
		'The geographical location of the energy installation, crucial for assessing energy production potential.',
	properties: {
		latitude: generateSchema('number', 'Latitude'),
		longitude: generateSchema('number', 'Longitude'),
	},
});
