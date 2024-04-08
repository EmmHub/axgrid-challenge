export const certificationsSchema = {
	type: 'array',
	title: 'Certifications',
	description:
		'List of certifications or credits like Renewable Energy Certificates (RECs) that add value to the energy being sold.',
	items: {
		type: 'string',
	},
};
