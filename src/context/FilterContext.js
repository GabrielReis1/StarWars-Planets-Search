import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const FilterContext = createContext();

export function FilterProvider({ children }) {
  const [filter, setFilter] = useState('');
  const [numericFilter, setNumericFilter] = useState(
    { column: 'population', comparison: 'maior que', value: 0 },
  );

  const getRowsWithNumericFilter = (filteredData) => filteredData.filter((planet) => {
    const { column } = numericFilter;
    const { comparison } = numericFilter;
    const value = Number(numericFilter.value);

    if (!column || !comparison || Number.isNaN(value)) {
      return true;
    }

    switch (comparison) {
    case 'maior que':
      return Number(planet[column]) > value;
    case 'menor que':
      return Number(planet[column]) < value;
    case 'igual a':
      return Number(planet[column]) === value;
    default:
      return true;
    }
  }).map((planet, index) => (
    <tr key={ index }>
      {Object.values(planet).map((value, i) => (
        <td key={ i }>{value}</td>
      ))}
    </tr>
  ));

  const getRowsWithoutNumericFilter = (filteredData) => filteredData
    .map((planet, index) => (
      <tr key={ index }>
        {Object.values(planet).map((value, i) => (
          <td key={ i }>{value}</td>
        ))}
      </tr>
    ));

  const values = {
    filter,
    setFilter,
    numericFilter,
    setNumericFilter,
    getRowsWithNumericFilter,
    getRowsWithoutNumericFilter };

  return (
    <FilterContext.Provider
      value={ values }
    >
      {children}
    </FilterContext.Provider>
  );
}

FilterProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
