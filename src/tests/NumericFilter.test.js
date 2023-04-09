import React from 'react';
import { render, fireEvent, getByRole, getByText } from '@testing-library/react';
import NumericFilter from '../components/NumericFilter';
import { FilterContext } from '../context/FilterContext';

describe('NumericFilter component', () => {
  let columnInput;
  let comparisonInput;
  let valueInput;
  let button;
  let setNumericFiltersMock;

  beforeEach(() => {
    setNumericFiltersMock = jest.fn();

    const component = render(
      <FilterContext.Provider value={{ numericFilters: [], setNumericFilters: setNumericFiltersMock }}>
        <NumericFilter />
      </FilterContext.Provider>,
    );

    columnInput = component.getByTestId('column-filter');
    comparisonInput = component.getByTestId('comparison-filter');
    valueInput = component.getByTestId('value-filter');
    button = component.getByTestId('button-filter');
  });

  it('deve renderizar entradas de coluna, comparação e valor e um botão', () => {
    expect(columnInput).toBeInTheDocument();
    expect(comparisonInput).toBeInTheDocument();
    expect(valueInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('deve adicionar um novo filtro ao array numericFilters quando o botão for clicado', () => {
    fireEvent.change(columnInput, { target: { value: 'population' } });
    fireEvent.change(comparisonInput, { target: { value: 'maior que' } });
    fireEvent.change(valueInput, { target: { value: '100' } });
    fireEvent.click(button);

    expect(setNumericFiltersMock).toHaveBeenCalledWith([{ column: 'population', comparison: 'maior que', value: '100' }]);
  });

  it('deve adicionar um filtro padrão ao array numericFilters quando o botão for clicado com entradas vazias', () => {
    fireEvent.click(button);

    expect(setNumericFiltersMock).toHaveBeenCalledWith([{ column: 'population', comparison: 'maior que', value: 0 }]);
  });

  it('deve remover um filtro do array numericFilters quando o botão remover for clicado', () => {
    const { getByText } = render(
      <FilterContext.Provider value={{ numericFilters: [{ column: 'population', comparison: 'maior que', value: '100' }], setNumericFilters: setNumericFiltersMock }}>
        <NumericFilter />
      </FilterContext.Provider>,
    );

    const removeButton = getByText('X');

    fireEvent.click(removeButton);

    expect(setNumericFiltersMock).toHaveBeenCalledWith([]);
  });

  it('deve remover todos os filtros numéricos do array numericFilters quando o botão "Remover Filtros" for clicado', () => {
    const { getAllByTestId } = render(
      <FilterContext.Provider value={{ numericFilters: [{ column: 'population', comparison: 'maior que', value: '100' }], setNumericFilters: setNumericFiltersMock }}>
        <NumericFilter />
      </FilterContext.Provider>,
    );
  
    const removeFiltersButtons = getAllByTestId('button-remove-filters');
    const removeFiltersButton = removeFiltersButtons[0];
    fireEvent.click(removeFiltersButton);

  
    expect(setNumericFiltersMock).toHaveBeenCalledWith([]);
  });

  it('deve voltar os valores iniciais dos inputs após a adição de um novo filtro', () => {
    fireEvent.change(columnInput, { target: { value: 'population' } });
    fireEvent.change(comparisonInput, { target: { value: 'maior que' } });
    fireEvent.change(valueInput, { target: { value: '100' } });
    fireEvent.click(button);
  
    expect(setNumericFiltersMock).toHaveBeenCalledWith([{ column: 'population', comparison: 'maior que', value: '100' }]);
    expect(columnInput.value).toBe('population');
    expect(comparisonInput.value).toBe('maior que');
    expect(valueInput.value).toBe('0');
  });  
});
