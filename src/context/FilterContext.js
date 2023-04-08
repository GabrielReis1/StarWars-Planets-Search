import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const FilterContext = createContext();

export function FilterProvider({ children }) {
  const [namefilter, setNameFilter] = useState('');
  const [numericFilters, setNumericFilters] = useState([]);

  const getRowsWithNumericFilter = (filteredData) => {
    console.log('getRowsWithNumericFilter called');
    if (filteredData.length === 0 || numericFilters.length === 0) {
      return [];
    }

    return filteredData
      .filter((planet) => numericFilters.every((filter) => {
        const { column, comparison, value } = filter;
        if (!column || !comparison || Number.isNaN(Number(value))) {
          return true;
        }

        const planetValue = Number(planet[column]);

        switch (comparison) {
        case 'maior que':
          return planetValue > Number(value);
        case 'menor que':
          return planetValue < Number(value);
        case 'igual a':
          return planetValue === Number(value);
        default:
          return true;
        }
      }))
      .filter(Boolean)
      .map((planet, index) => (
        <tr key={ index }>
          {Object.values(planet).map((value, i) => (
            <td key={ i }>{value}</td>
          ))}
        </tr>
      ));
  };

  const getRows = (filteredData) => filteredData
    .map((planet, index) => (
      <tr key={ index }>
        {Object.values(planet).map((value, i) => (
          <td key={ i }>{value}</td>
        ))}
      </tr>
    ));

  const values = {
    getRows,
    namefilter,
    setNameFilter,
    numericFilters,
    setNumericFilters,
    getRowsWithNumericFilter,
  };

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
