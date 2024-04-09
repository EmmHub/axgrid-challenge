type Trade = {
	energyType: string;
	price: number;
	minimumPurchaseQuantity: number;
	location: {
		latitude: number;
		longitude: number;
	};
	capacity: number;
	energyOutputPredictions: string;
	timeOfAvailability: string;
	certifications: string[];
	contractTerms: {
		durationAmount: string;
		durationType: string;
		earlyTerminationPenalty: boolean;
		otherLegalConditions: string;
	};
	paymentTerms: {
		paymentMethod: string;
		paymentSchedule: string;
	};
	status: string;
	id: string | number;
};

type Trades = Trade[];

type AddTrade = (trade: Trade) => void;
type EmitTradeUpdate = (id: string | number) => void;

type Values = {
	trades: Trades;
	addTrade: AddTrade;
	emitTradeUpdate: EmitTradeUpdate;
};

interface CellInfo extends CellOriginalType {
	value: any;
}

type RenderCellFunction = (cellInfo: CellInfo) => React.ReactNode;

type CellOriginalType = {
	row: {
		original: TableFormat;
	};
};

interface ITradeCell extends CellInfo {
	handleClick: (value: any) => () => void;
}

interface TableFormat {
	EnergyType: string;
	Price: number;
	MinimumPurchaseQuantity: number;
	EnergyOutputPredictions: string;
	TimeOfAvailability: string;
	ContractDuration: string;
	EarlyTerminationPenalty: boolean;
	ContractConditions: string;
	PaymentMethod: string;
	PaymentSchedule: string;
	Status: string;
	TradeId?: string | number;
	Details?: string;
}

interface EnergyTradesTableProps {
	data: TableFormat[];
	columns: Column<TableFormat>[];
}

type SelectColumnFilterProps = {
	column: ColumnInstance;
};

type RowType = {
	values: {
		[rowId: string]: string | number;
	};
};

type ProviderProps = {
	children: React.ReactNode;
};
