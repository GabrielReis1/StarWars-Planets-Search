import React, { useContext } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FilterProvider, FilterContext } from '../context/FilterContext';
import { getRowsWithNumericFilter } from '../services/filters';

describe('FilterProvider', () => {
  it('deve render o filho', () => {
    render(
      <FilterProvider>
        <div>Child component</div>
      </FilterProvider>
    );
    const childComponent = screen.getByText('Child component');
    expect(childComponent).toBeInTheDocument();
  });

  it('deve atualizar o estado do namefilter', () => {
    const WrapperComponent = () => {
      const { namefilter, setNameFilter } = useContext(FilterContext);
      return (
        <>
          <div data-testid="name-filter">{namefilter}</div>
          <button onClick={() => setNameFilter('new name filter')}>
            Update name filter
          </button>
        </>
      );
    };

    render(
      <FilterProvider>
        <WrapperComponent />
      </FilterProvider>
    );

    const nameFilterDiv = screen.getByTestId('name-filter');
    expect(nameFilterDiv).toBeInTheDocument();

    const updateButton = screen.getByText('Update name filter');
    fireEvent.click(updateButton);

    expect(nameFilterDiv).toHaveTextContent('new name filter');
  });

  it('deve atualizar o estado numericFilters', () => {
    const WrapperComponent = () => {
      const { numericFilters, setNumericFilters } = useContext(FilterContext);
      return (
        <>
          <div>{numericFilters.length}</div>
          <button
            onClick={() =>
              setNumericFilters([{ column: 'diameter', comparison: 'maior que', value: '100' }])
            }
          >
            Update numeric filters
          </button>
        </>
      );
    };

    render(
      <FilterProvider>
        <WrapperComponent />
      </FilterProvider>
    );

    const numericFiltersDiv = screen.getByText('0');
    expect(numericFiltersDiv).toBeInTheDocument();

    const updateButton = screen.getByText('Update numeric filters');
    fireEvent.click(updateButton);

    expect(numericFiltersDiv).toHaveTextContent('1');
  });

  it('deve retornar uma matriz vazia quando os dados filtrados estiverem vazios', () => {
    const WrapperComponent = () => {
      const { getRowsWithNumericFilter } = useContext(FilterContext);
      const filteredData = [];
      const rows = getRowsWithNumericFilter(filteredData);
      return (
        <table>
          <tbody>{rows}</tbody>
        </table>
      );
    };

    render(
      <FilterProvider>
        <WrapperComponent />
      </FilterProvider>
    );

    const tableBody = screen.getByRole('table').querySelector('tbody');
    expect(tableBody.childElementCount).toBe(0);
  });

  it('deve retornar um array vazio quando numericFilters estiver vazio', () => {
    const WrapperComponent = () => {
      const { getRowsWithNumericFilter } = useContext(FilterContext);
      const filteredData = [{ name: 'Earth', diameter: '12742' }];
      const rows = getRowsWithNumericFilter(filteredData);
      return (
        <table>
          <tbody>{rows}</tbody>
        </table>
      );
    };

    render(
      <FilterProvider>
        <WrapperComponent />
      </FilterProvider>
    );

    const tableBody = screen.getByRole('table').querySelector('tbody');
    expect(tableBody.childElementCount).toBe(0);
  });

  it('deve retornar linhas da tabela com dados', () => {
    const WrapperComponent = () => {
      const { getRows } = useContext(FilterContext);
      const filteredData = [{ name: 'Earth', diameter: '12742' }];
      const rows = getRows(filteredData);
      return (
        <table>
          <tbody>{rows}</tbody>
        </table>
      );
    };
  
    render(
      <FilterProvider>
        <WrapperComponent />
      </FilterProvider>
    );
  
    const tableBody = screen.getByRole('table').querySelector('tbody');
    expect(tableBody.childElementCount).toBe(1);
    expect(tableBody).toHaveTextContent('Earth');
    expect(tableBody).toHaveTextContent('12742');
  });  

  it('deve filtrar dados numéricos corretamente', () => {
    const filteredData = [    { name: 'Earth', diameter: '12742' },    { name: 'Mars', diameter: '6779' },    { name: 'Jupiter', diameter: '139822' }  ];
    const numericFilters = [    { column: 'diameter', comparison: 'maior que', value: '10000' }  ];
    const expectedRows = [    '<tr><td>Earth</td><td>12742</td></tr>',    '<tr><td>Jupiter</td><td>139822</td></tr>'  ];
  
    const rows = getRowsWithNumericFilter(filteredData, numericFilters);
  
    expect(rows.length).toBe(2);
  });
  
});
