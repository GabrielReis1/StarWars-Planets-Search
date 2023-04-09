import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FilterInput from '../components/FilterInput';
import { FilterContext } from '../context/FilterContext';

describe('FilterInput', () => {
  test('renderiza corretamente', () => {
    const { getByTestId } = render(<FilterInput />);
    expect(getByTestId('name-filter')).toBeInTheDocument();
  });

  test('chama setNameFilter quando digita no input', () => {
    const mockSetNameFilter = jest.fn();
    const { getByTestId } = render(
      <FilterContext.Provider value={{ setNameFilter: mockSetNameFilter }}>
        <FilterInput />
      </FilterContext.Provider>
    );
    const input = getByTestId('name-filter');
    fireEvent.change(input, { target: { value: 'Tatooine' } });
    expect(mockSetNameFilter).toHaveBeenCalledWith('Tatooine');
  });
});
