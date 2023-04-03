import React, { useEffect, useState } from 'react';
import { FilterProvider } from './context/FilterContext';
import Table from './components/Table';

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
      <Table data={ planets } />
    </FilterProvider>
  );
}

export default App;
