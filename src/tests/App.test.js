import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App component', () => {
  it('renderiza o h1 do aplicativo', () => {
    render(<App />);
    const header = screen.getByText('STARWARS');
    expect(header).toBeInTheDocument();
  });

  it('renderiza FilterInput', () => {
    render(<App />);
    const filterInput = screen.getByPlaceholderText('Nome do Planeta');
    expect(filterInput).toBeInTheDocument();
  });

  it('renderiza NumericFilter', () => {
    render(<App />);
    const numericFilter = screen.getByText('population');
    expect(numericFilter).toBeInTheDocument();
  });

  it('renderiza Table', () => {
    render(<App />);
    const tableComponent = screen.getByTestId('table');
    expect(tableComponent).toBeInTheDocument();
  });
});
