import React, { useContext } from 'react';
import { FilterContext } from '../context/FilterContext';

function FilterInput() {
  const { setNameFilter } = useContext(FilterContext);

  return (
    <input
      type="text"
      data-testid="name-filter"
      onChange={ (e) => setNameFilter(e.target.value) }
      placeholder="Nome do Planeta"
    />
  );
}

export default FilterInput;
