export const trades = [
	{
		energyType: 'Solar',
		price: 100,
		minimumPurchaseQuantity: 500,
		location: {
			latitude: 35.6895,
			longitude: 139.6917,
		},
		capacity: 50,
		energyOutputPredictions: 'low',
		timeOfAvailability: 'day',
		certifications: ['ISO-14001', 'REC'],
		contractTerms: {
			durationAmount: '12',
			durationType: 'months',
			earlyTerminationPenalty: true,
			otherLegalConditions: 'N/A',
		},
		paymentTerms: {
			paymentMethod: 'Bank Transfer',
			paymentSchedule: 'Monthly',
		},
		status: 'created',
		id: 2342342,
	},
	{
		energyType: 'Wind',
		price: 100,
		minimumPurchaseQuantity: 500,
		location: {
			latitude: 35.6895,
			longitude: 139.6917,
		},
		capacity: 50,
		energyOutputPredictions: 'low',
		timeOfAvailability: 'day',
		certifications: ['ISO-14001', 'REC'],
		contractTerms: {
			durationAmount: '12',
			durationType: 'months',
			earlyTerminationPenalty: true,
			otherLegalConditions: 'N/A',
		},
		paymentTerms: {
			paymentMethod: 'Bank Transfer',
			paymentSchedule: 'Monthly',
		},
		status: 'created',
		id: 234234222,
	},
];

const commonFields = {
	location: 'root_location',
	timeOfAvailability: 'root_timeOfAvailability',
	certifications: 'root_certifications',
};

export const energyTypesWithFields = [
	{
		type: 'Solar',
		fields: [
			commonFields.location,
			'root_energyOutputPredictions',
			commonFields.timeOfAvailability,
			commonFields.certifications,
		],
	},
	{
		type: 'Wind',
		fields: [
			commonFields.location,
			'root_turbineEfficiency',
			'root_windSpeedPredictions',
			commonFields.timeOfAvailability,
			commonFields.certifications,
		],
	},
	{
		type: 'Gas',
		fields: [
			'root_deliveryMethod',
			'root_flexibilityOfSupply',
			'root_emissionCreditsOrPenalties',
			'root_contractLength',
		],
	},
	{
		type: 'Hydro',
		fields: [
			'root_waterFlowRate',
			'root_reservoirLevel',
			'root_regulatoryCompliance',
			'root_flexibilityOfSupply',
			'root_energyStorage',
		],
	},
	{
		type: 'Kinetic',
		fields: [
			commonFields.location,
			'root_energyConversionEfficiency',
			'root_predictabilityOfSource',
		],
	},
	{
		type: 'Thermal',
		fields: [
			'root_heatSourceStability',
			'root_temperatureGradient',
			'root_conversionEfficiency',
			commonFields.location,
			'root_environmentalImpactAndRegulation',
		],
	},
];
