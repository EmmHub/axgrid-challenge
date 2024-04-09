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

interface CustomColumnInstance<D extends object = Record<string, unknown>>
	extends ColumnInstance<D> {
	canFilter?: boolean;
}

const renderTableHeaderRow = (headerGroup: HeaderGroup<TableFormat>) => (
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

const renderTableRow = (
	row: Row<TableFormat>,
	prepareRow: (row: Row<TableFormat>) => void
) => {
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

export const EnergyTradesTable: React.FC<EnergyTradesTableProps> = ({
	data,
	columns,
}) => {
	const tableProps = { columns, data };
	const tableInstance = useTable(tableProps, useFilters);

	return (
		<div className='flex-row flex-center'>
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
