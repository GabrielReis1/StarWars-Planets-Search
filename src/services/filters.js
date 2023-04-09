export const getRowsWithNumericFilter = (filteredData, numericFilters) => {
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
