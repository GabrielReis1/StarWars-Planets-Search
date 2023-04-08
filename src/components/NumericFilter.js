import React, { useContext, useState } from 'react';
import { FilterContext } from '../context/FilterContext';

function NumericFilter() {
  const { numericFilters, setNumericFilters } = useContext(FilterContext);
  const [filter, setFilter] = useState(
    { column: 'population', comparison: 'maior que', value: 0 },
  );

  const columnsOptions = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ].filter(
    (column) => !numericFilters.some((filtered) => filtered.column === column),
  );

  const handleSetNumericFilter = () => {
    if (filter.column !== '' && filter.comparison !== '' && filter.value !== 0) {
      const columns = new Set(numericFilters.map((filtered) => filtered.column));
      if (!columns.has(filter.column)) {
        setNumericFilters([...numericFilters, filter]);
      }
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
        {columnsOptions.map((option) => (
          <option value={ option } key={ option }>{option}</option>
        ))}
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

      <button data-testid="button-remove-filters" onClick={ () => setNumericFilters([]) }>
        Remover Filtros
      </button>

      {numericFilters && numericFilters.map((numericFilter, index) => (
        <div key={ index }>
          <span data-testid="filter">
            {numericFilter.column}
            {' '}
            {numericFilter.comparison}
            {' '}
            {numericFilter.value}
            <button
              onClick={ () => handleRemoveFilter(index) }
            >
              X
            </button>
          </span>
        </div>
      ))}

    </div>
  );
}

export default NumericFilter;
