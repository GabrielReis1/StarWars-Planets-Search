import React, { useContext, useState } from 'react';
import { FilterContext } from '../context/FilterContext';

function NumericFilter() {
  const { numericFilter, setNumericFilter } = useContext(FilterContext);
  const [column, setColumn] = useState(numericFilter.column);
  const [comparison, setComparison] = useState(numericFilter.comparison);
  const [value, setValue] = useState(numericFilter.value);

  const handleFilter = () => {
    setNumericFilter({ column, comparison, value: Number(value) || value === 0 });
  };

  return (
    <div>
      <select
        data-testid="column-filter"
        value={ column }
        onChange={ (e) => setColumn(e.target.value) }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>

      <select
        data-testid="comparison-filter"
        value={ comparison }
        onChange={ (e) => setComparison(e.target.value) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>

      <input
        type="number"
        data-testid="value-filter"
        value={ value }
        onChange={ (e) => setValue(e.target.value) }
      />

      <button data-testid="button-filter" onClick={ handleFilter }>
        Filtrar
      </button>
    </div>
  );
}

export default NumericFilter;
