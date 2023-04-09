import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { getRowsWithNumericFilter } from '../services/filters';

export const FilterContext = createContext({
  namefilter: '',
  numericFilters: [],
});
export function FilterProvider({ children }) {
  const [namefilter, setNameFilter] = useState('');
  const [numericFilters, setNumericFilters] = useState([]);

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
    getRowsWithNumericFilter: (filteredData) => getRowsWithNumericFilter(
      filteredData,
      numericFilters,
    ),
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
