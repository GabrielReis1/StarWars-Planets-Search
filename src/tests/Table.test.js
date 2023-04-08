import React from 'react';
import { render, screen } from '@testing-library/react';
import { FilterProvider } from '../context/FilterContext';
import Table from '../components/Table';

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
  it('renders table headers and data', () => {
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

    const earthData = screen.getByText('Tatooine');
    expect(earthData).toBeInTheDocument();

    const marsData = screen.getByText('Alderaan');
    expect(marsData).toBeInTheDocument();
  });
});
