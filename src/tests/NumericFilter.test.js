import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import NumericFilter from '../components/NumericFilter';
import { FilterContext } from '../context/FilterContext';

describe('NumericFilter component', () => {
  it('should render column, comparison and value inputs and a button', () => {
    const { getByTestId } = render(
      <FilterContext.Provider value={ { numericFilters: [], setNumericFilters: () => {} } }>
        <NumericFilter />
      </FilterContext.Provider>,
    );

    const columnInput = getByTestId('column-filter');
    const comparisonInput = getByTestId('comparison-filter');
    const valueInput = getByTestId('value-filter');
    const button = getByTestId('button-filter');

    expect(columnInput).toBeInTheDocument();
    expect(comparisonInput).toBeInTheDocument();
    expect(valueInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('should add a new filter to the numericFilters array when the button is clicked', () => {
    const setNumericFiltersMock = jest.fn();
    const { getByTestId } = render(
      <FilterContext.Provider value={ { numericFilters: [], setNumericFilters: setNumericFiltersMock } }>
        <NumericFilter />
      </FilterContext.Provider>,
    );

    const columnInput = getByTestId('column-filter');
    const comparisonInput = getByTestId('comparison-filter');
    const valueInput = getByTestId('value-filter');
    const button = getByTestId('button-filter');

    fireEvent.change(columnInput, { target: { value: 'population' } });
    fireEvent.change(comparisonInput, { target: { value: 'maior que' } });
    fireEvent.change(valueInput, { target: { value: '100' } });
    fireEvent.click(button);

    expect(setNumericFiltersMock).toHaveBeenCalledWith([{ column: 'population', comparison: 'maior que', value: '100' }]);
  });

  it('should add a default filter to the numericFilters array when the button is clicked with empty inputs', () => {
    const setNumericFiltersMock = jest.fn();
    const { getByTestId } = render(
      <FilterContext.Provider value={ { numericFilters: [], setNumericFilters: setNumericFiltersMock } }>
        <NumericFilter />
      </FilterContext.Provider>,
    );

    const button = getByTestId('button-filter');

    fireEvent.click(button);

    expect(setNumericFiltersMock).toHaveBeenCalledWith([{ column: 'population', comparison: 'maior que', value: 0 }]);
  });

  it('should remove a filter from the numericFilters array when the remove button is clicked', () => {
    const setNumericFiltersMock = jest.fn();
    const { getByTestId, getByText } = render(
      <FilterContext.Provider value={ { numericFilters: [{ column: 'population', comparison: 'maior que', value: '100' }], setNumericFilters: setNumericFiltersMock } }>
        <NumericFilter />
      </FilterContext.Provider>,
    );

    const removeButton = getByText('X');

    fireEvent.click(removeButton);

    expect(setNumericFiltersMock).toHaveBeenCalledWith([]);
  });
});
