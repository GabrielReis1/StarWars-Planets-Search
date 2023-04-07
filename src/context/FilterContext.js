import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const FilterContext = createContext();

export function FilterProvider({ children }) {
  const [filter, setFilter] = useState('');
  const [numericFilter, setNumericFilter] = useState(
    { column: 'population', comparison: 'maior que', value: 0 },
  );

  return (
    <FilterContext.Provider
      value={ { filter, setFilter, numericFilter, setNumericFilter } }
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
