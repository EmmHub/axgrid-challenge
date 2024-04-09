import { generateSchema } from '../../utils';

const earlyTerminationPenaltySchema = generateSchema(
	'boolean',
	'Early Termination Penalty',
	{
		description:
			'Indicates whether there are penalties for early termination of the contract.',
	}
);

const otherConditionsSchema = generateSchema(
	'string',
	'Other Legal Conditions',
	{
		description:
			'Any other legal conditions or clauses that are part of the contract.',
	}
);

export const contractTermsSchema = generateSchema('object', 'Contract Terms', {
	description:
		'Details about the duration of the contract, penalties for early termination, and other legal conditions.',
	properties: {
		durationType: {
			type: 'string',
			title: 'Duration Type',
			enum: ['Years', 'Months'],
			default: 'Years',
		},
		durationAmount: {
			type: 'number',
			title: 'Duration Amount',
			minimum: 1,
			maximum: 100,
			default: 1,
		},
		earlyTerminationPenalty: earlyTerminationPenaltySchema,
		otherLegalConditions: otherConditionsSchema,
	},
	required: [
		'durationType',
		'durationAmount',
		'earlyTerminationPenalty',
		'otherLegalConditions',
	],
});

export const paymentMethodSchema = generateSchema('string', 'Payment Method', {
	enum: ['Bank Transfer', 'Credit Card', 'PayPal', 'Check', 'Cash'],
});

export const paymentScheduleSchema = generateSchema(
	'string',
	'Payment Schedule',
	{
		enum: ['Monthly', 'Quarterly', 'Bi-Annually', 'Annually', 'Upon Delivery'],
	}
);

export const paymentTermsSchema = generateSchema('object', 'Payment Terms', {
	description: 'Specifies how and when payments will be made.',
	properties: {
		paymentMethod: paymentMethodSchema,
		paymentSchedule: paymentScheduleSchema,
	},
	required: ['paymentMethod', 'paymentSchedule'],
});
