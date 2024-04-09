export const uiSchema = {
	'ui:order': ['*', 'contractTerms', 'paymentTerms'],
	price: { 'ui:classNames': 'col-md-6' },
	energyType: { 'ui:classNames': 'col-md-6' },
	waterFlowRate: { 'ui:classNames': 'col-md-6' },
	reservoirLevel: { 'ui:classNames': 'col-md-6' },
	windSpeedPredictions: { 'ui:classNames': 'col-md-6' },
	turbineEfficiency: { 'ui:classNames': 'col-md-6' },
	regulatoryCompliance: { 'ui:classNames': 'col-md-6' },
	flexibilityOfSupply: { 'ui:classNames': 'col-md-6' },
	emissionCreditsOrPenalties: { 'ui:classNames': 'col-md-6' },
	heatSourceStability: { 'ui:classNames': 'col-md-6' },
	temperatureGradient: { 'ui:classNames': 'col-md-6' },
	contractTerms: {
		durationType: {
			'ui:classNames': 'col-md-6',
		},
		durationAmount: {
			'ui:classNames': 'col-md-6',
		},
	},
	paymentTerms: {
		paymentMethod: { 'ui:classNames': 'col-md-6' },
		paymentSchedule: { 'ui:classNames': 'col-md-6' },
	},
	location: {
		latitude: { 'ui:classNames': 'col-md-6' },
		longitude: { 'ui:classNames': 'col-md-6' },
	},
	'ui:readonly': false,
	'ui:submitButtonOptions': {
		norender: false,
	},
};
