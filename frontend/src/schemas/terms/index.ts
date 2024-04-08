import { generateSchema } from '../../utils';

const durationSchema = generateSchema('string', 'Duration', {
	description:
		'The length of the contract, typically specified in months or years.',
});

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

const contractTermsSchema = generateSchema('object', 'Contract Terms', {
	description:
		'Details about the duration of the contract, penalties for early termination, and other legal conditions.',
	properties: {
		duration: durationSchema,
		early_termination_penalty: earlyTerminationPenaltySchema,
		other_conditions: otherConditionsSchema,
	},
});

const paymentMethodSchema = generateSchema('string', 'Payment Method', {
	description: 'The method by which payments will be made.',
	enum: ['Bank Transfer', 'Credit Card', 'PayPal', 'Check', 'Cash'],
});

const paymentScheduleSchema = generateSchema('string', 'Payment Schedule', {
	description: 'The schedule of payments.',
	enum: ['Monthly', 'Quarterly', 'Bi-Annually', 'Annually', 'Upon Delivery'],
});

const paymentTermsSchema = generateSchema('object', 'Payment Terms', {
	description: 'Specifies how and when payments will be made.',
	properties: {
		payment_method: paymentMethodSchema,
		payment_schedule: paymentScheduleSchema,
	},
});

export const termsSchema = generateSchema('object', 'Terms', {
	description: 'Contractual terms associated with the energy offering.',
	properties: {
		contract_terms: contractTermsSchema,
		payment_terms: paymentTermsSchema,
	},
});
