import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FilterContext } from '../context/FilterContext';
import FilterInput from './FilterInput';
import NumericFilter from './NumericFilter';
import '../styles/table.css';

function Table({ data }) {
  const headers = data.length
    ? Object.keys(data[0]).map((header) => <th key={ header }>{header}</th>)
    : null;

  const { filter, numericFilter } = useContext(FilterContext);

  const filteredData = data.filter((planet) => planet.name.toLowerCase()
    .includes(filter.toLowerCase()));

  const rows = filteredData.filter((planet) => {
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

  return (
    <div>
      <FilterInput />
      <NumericFilter />
      <div className="table-container">
        <table>
          <thead>
            <tr>{headers}</tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    </div>
  );
}

Table.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      map: PropTypes.func.isRequired,
      length: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default Table;
