import React, { useEffect, useState } from 'react';
import { FilterProvider } from './context/FilterContext';

import Table from './components/Table';
import FilterInput from './components/FilterInput';
import NumericFilter from './components/NumericFilter';

function App() {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const data = await response.json();
      const processedData = data.results.map((planet) => {
        const { residents, ...otherProps } = planet;
        return otherProps;
      });
      setPlanets(processedData);
    };

    fetchData();
  }, []);

  return (
    <FilterProvider>
      <h1>STARWARS</h1>
      <FilterInput />
      <NumericFilter />
      <Table data={ planets } data-testid="table" />
    </FilterProvider>
  );
}

export default App;
