/* eslint-disable react/jsx-key */
import React from 'react';
import {
	Cell,
	ColumnInstance,
	HeaderGroup,
	Row,
	useFilters,
	useTable,
} from 'react-table';
import { SelectColumnFilter } from '../SelectColumnFilter';

/**
 * Represents an instance of a custom column in a table.
 *
 * @template D - The type of the data in the column.
 */
interface CustomColumnInstance<D extends object = Record<string, unknown>>
	extends ColumnInstance<D> {
	canFilter?: boolean;
}

/**
 * Renders the table header row using the given header group. Each cell in the header row represents a table column.
 *
 * @param {HeaderGroup<TableFormat>} headerGroup - The header group containing column headers.
 * @returns {React.ReactNode} - The rendered table header row.
 */
const renderTableHeaderRow = (
	headerGroup: HeaderGroup<TableFormat>
): React.ReactNode => (
	<tr {...headerGroup.getHeaderGroupProps()}>
		{headerGroup.headers.map((column) => {
			const columnHeader = column as CustomColumnInstance<TableFormat>;
			return (
				<th {...column.getHeaderProps()} className='tableHeader'>
					{columnHeader.render('Header')}
					{columnHeader.Header === 'Energy Type' && (
						<SelectColumnFilter column={column} />
					)}
				</th>
			);
		})}
	</tr>
);

/**
 * Renders a single table row.
 * @param {Row<TableFormat>} row - The row to render.
 * @param {(row: Row<TableFormat>) => void} prepareRow - A function to prepare the row before rendering.
 * @returns {React.ReactElement} - The rendered table row.
 */
const renderTableRow = (
	row: Row<TableFormat>,
	prepareRow: (row: Row<TableFormat>) => void
): React.ReactElement => {
	prepareRow(row);
	return (
		<tr {...row.getRowProps()}>
			{row.cells.map((cell: Cell<TableFormat>) => (
				<td {...cell.getCellProps()} className='tableCell'>
					{cell.render('Cell')}
				</td>
			))}
		</tr>
	);
};

/**
 * React component for displaying an Energy Trades Table.
 *
 * @component
 * @category Components
 *
 * @param {EnergyTradesTableProps} props - The properties for the EnergyTradesTable component.
 * @param {Array.<TableFormat>} props.data - The data for the table.
 * @param {Column<TableFormat>[]} props.columns - The columns to display in the table.
 *
 * @returns {React.ReactElement} - The rendered EnergyTradesTable component.
 */
export const EnergyTradesTable: React.FC<EnergyTradesTableProps> = ({
	data,
	columns,
}: EnergyTradesTableProps): React.ReactElement => {
	const tableProps = { columns, data };
	const tableInstance = useTable(tableProps, useFilters);

	return (
		<div data-testid='EnergyTradesTable' className='flex-row flex-center'>
			<div className='w-80'>
				<table {...tableInstance.getTableProps()} className='energyTradesTable'>
					<thead>{tableInstance.headerGroups.map(renderTableHeaderRow)}</thead>
					<tbody {...tableInstance.getTableBodyProps()}>
						{tableInstance.rows.map((row) =>
							renderTableRow(row, tableInstance.prepareRow)
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};
