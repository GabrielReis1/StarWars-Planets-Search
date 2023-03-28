import React from 'react';
import PropTypes from 'prop-types';
import '../styles/table.css';

function Table({ data }) {
  const headers = data.length
    ? Object.keys(data[0]).map((header) => <th key={ header }>{header}</th>)
    : null;

  const rows = data.map((planet, index) => (
    <tr key={ index }>
      {Object.values(planet).map((value, i) => (
        <td key={ i }>{value}</td>
      ))}
    </tr>
  ));

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>{headers}</tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
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
