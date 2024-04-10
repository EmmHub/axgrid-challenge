import React, { useMemo } from 'react';

/**
 * A function that creates an onChange event handler for a select element.
 * The event handler takes a setFilter function as parameter and returns
 * another function that handles the onChange event of the select element.
 *
 * @param {Function} setFilter - A function that sets the filter value.
 */
export const onChangeHandler =
	(setFilter: (filterValue: string | undefined) => void) =>
	(e: React.ChangeEvent<HTMLSelectElement>) =>
		setFilter(e.target.value || undefined);

/**
 * Calculates filter options based on the provided rowId and rows.
 *
 * @param {string} rowId - The identifier of the row to filter.
 * @param {RowType[]} rows - An array of rows containing the data.
 *
 * @returns {Array} - An array of unique filter options.
 */
export const calcFilterOptions = (
	rowId: string,
	rows: RowType[]
): Array<any> => {
	const options = new Set();
	rows.forEach((row) => options.add(row.values[rowId]));
	return [...options.values()];
};

/**
 * Represents a filter component for selecting column values.
 * @param {Object} SelectColumnFilterProps - The props for the SelectColumnFilter component.
 * @param {Object} SelectColumnFilterProps.column - The column object containing filter information.
 * @param {string} SelectColumnFilterProps.column.filterValue - The current filter value.
 * @param {function} SelectColumnFilterProps.column.setFilter - The function to set the filter value.
 * @param {Array} SelectColumnFilterProps.column.preFilteredRows - The pre-filtered rows for the column.
 * @param {string} SelectColumnFilterProps.column.id - The ID of the column.
 * @returns {React.ReactElement} - The JSX element representing the SelectColumnFilter component.
 */
export const SelectColumnFilter = ({
	column: { filterValue, setFilter, preFilteredRows, id },
}: SelectColumnFilterProps): React.ReactElement => {
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
