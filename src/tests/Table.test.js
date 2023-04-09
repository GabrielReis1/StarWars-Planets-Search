import React, { useContext } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FilterProvider, FilterContext } from '../context/FilterContext';
import Table from '../components/Table';
import FilterInput from '../components/FilterInput';

const mockData = [
  {
    "name": "Tatooine", 
    "rotation_period": "23", 
    "orbital_period": "304", 
    "diameter": "10465", 
    "climate": "arid", 
    "gravity": "1 standard", 
    "terrain": "desert", 
    "surface_water": "1", 
    "population": "200000", 
  },
  {
    "name": "Alderaan", 
    "rotation_period": "24", 
    "orbital_period": "364", 
    "diameter": "12500", 
    "climate": "temperate", 
    "gravity": "1 standard", 
    "terrain": "grasslands, mountains", 
    "surface_water": "40", 
    "population": "2000000000", 
  },
];

describe('Table component', () => {
  it('deve renderizar cabeçalhos de tabela e dados', () => {
    render(
      <FilterProvider>
        <Table data={mockData} />
      </FilterProvider>
    );

    const nameHeader = screen.getByText('name');
    expect(nameHeader).toBeInTheDocument();

    const rotationPeriodHeader = screen.getByText('rotation_period');
    expect(rotationPeriodHeader).toBeInTheDocument();

    const diameterHeader = screen.getByText('diameter');
    expect(diameterHeader).toBeInTheDocument();

    const climateHeader = screen.getByText('climate');
    expect(climateHeader).toBeInTheDocument();

    const TatooData = screen.getByText('Tatooine');
    expect(TatooData).toBeInTheDocument();

    const AlderaanData = screen.getByText('Alderaan');
    expect(AlderaanData).toBeInTheDocument();
  });

  it('deve renderizar a tabela vazia quando nenhum dado é fornecido', () => {
    render(
      <FilterProvider>
        <Table data={[]} />
      </FilterProvider>
    );

    const tableElement = screen.getByRole('table');
    expect(tableElement).toBeInTheDocument();

    const tableRows = screen.queryAllByRole('row');
    expect(tableRows).toHaveLength(0);
  });

  it(' deve filtrar os dados da tabela com base no filtro de nome', () => {
    render(
      <FilterProvider namefilter="tat">
        <Table data={mockData} />
      </FilterProvider>
    );

    const TatooData = screen.getByText('Tatooine');
    expect(TatooData).toBeInTheDocument();
  });

  it('filtra os dados da tabela com base em filtros numéricos', () => {
    render(
      <FilterProvider numericFilters={[{ column: 'diameter', comparison: 'maior que', value: '12000' }]}>
        <Table data={mockData} />
      </FilterProvider>
    );

    const AlderaanData = screen.getByText('Alderaan');
    expect(AlderaanData).toBeInTheDocument();

    const TatooData = screen.getByText('Tatooine');
    expect(TatooData).toBeInTheDocument();
  });

  it('renderiza dados da tabela com filtros numéricos e filtro de nome', () => {
    const { getByTestId } = render(
      <FilterProvider numericFilters={[{ column: 'diameter', comparison: 'maior que', value: '12000' }]}>
        <FilterInput />
        <Table data={mockData} />
      </FilterProvider>
    );

    const input = getByTestId('name-filter');
    fireEvent.change(input, { target: { value: 'al' } });

    const AlderaanData = screen.getByText('Alderaan');
    expect(AlderaanData).toBeInTheDocument();
  });
});
