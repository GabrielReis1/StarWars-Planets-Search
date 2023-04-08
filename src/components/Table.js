import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FilterContext } from '../context/FilterContext';
import '../styles/table.css';

function Table({ data }) {
  const headers = data.length
    ? Object.keys(data[0]).map((header) => <th key={ header }>{header}</th>)
    : null;

  const { namefilter, numericFilters } = useContext(FilterContext);

  const filteredData = data.filter((planet) => planet.name.toLowerCase()
    .includes(namefilter.toLowerCase()));

  const {
    getRowsWithNumericFilter,
    getRows } = useContext(FilterContext);

  return (
    <div>
      <div className="table-container">
        <table>
          <thead>
            {headers ? <tr>{headers}</tr> : null}
          </thead>
          <tbody>
            {numericFilters.length !== 0
              ? getRowsWithNumericFilter(filteredData)
              : getRows(filteredData)}
          </tbody>
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
