import React, { useContext, useState } from 'react';
import { FilterContext } from '../context/FilterContext';

function NumericFilter() {
  const { numericFilters, setNumericFilters } = useContext(FilterContext);
  const [filter, setFilter] = useState(
    { column: 'population', comparison: 'maior que', value: 0 },
  );

  const handleSetNumericFilter = () => {
    if (filter.column !== '' && filter.comparison !== '' && filter.value !== 0) {
      setNumericFilters([...numericFilters, filter]);
      setFilter({ column: 'population', comparison: 'maior que', value: 0 });
    } else {
      setNumericFilters([...numericFilters, {
        column: 'population',
        comparison: 'maior que',
        value: 0,
      }]);
    }
  };

  const handleRemoveFilter = (index) => {
    const newFilters = [...numericFilters];
    newFilters.splice(index, 1);
    setNumericFilters(newFilters);
  };

  return (
    <div>
      <select
        data-testid="column-filter"
        value={ filter.column }
        onChange={ (e) => setFilter({ ...filter, column: e.target.value }) }
      >
        <option value="population" selected>population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>

      <select
        data-testid="comparison-filter"
        value={ filter.comparison }
        onChange={ (e) => setFilter({ ...filter, comparison: e.target.value }) }
      >
        <option value="maior que" selected>maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>

      <input
        type="number"
        data-testid="value-filter"
        value={ filter.value }
        onChange={ (e) => setFilter({ ...filter, value: e.target.value }) }
      />

      <button data-testid="button-filter" onClick={ handleSetNumericFilter }>
        Filtrar
      </button>
      {numericFilters && numericFilters.map((numericFilter, index) => (
        <div key={ index }>
          <span>
            {numericFilter.column}
            {' '}
            {numericFilter.comparison}
            {' '}
            {numericFilter.value}
          </span>
          <button onClick={ () => handleRemoveFilter(index) }>X</button>
        </div>
      ))}

    </div>
  );
}

export default NumericFilter;
