import React, { useMemo } from 'react';

export const onChangeHandler =
	(setFilter: (filterValue: string | undefined) => void) =>
	(e: React.ChangeEvent<HTMLSelectElement>) =>
		setFilter(e.target.value || undefined);

export const calcFilterOptions = (rowId: string, rows: RowType[]) => {
	const options = new Set();
	rows.forEach((row) => options.add(row.values[rowId]));
	return [...options.values()];
};

export const SelectColumnFilter = ({
	column: { filterValue, setFilter, preFilteredRows, id },
}: SelectColumnFilterProps) => {
	const handleFilterChange = onChangeHandler(setFilter);
	const options = useMemo(
		() => calcFilterOptions(id, preFilteredRows).map(String),
		[id, preFilteredRows]
	);

	return (
		<select value={filterValue} onChange={handleFilterChange}>
			<option value=''>All</option>
			{options.map((option) => (
				<option key={option} value={option}>
					{option}
				</option>
			))}
		</select>
	);
};
