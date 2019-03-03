import React from 'react';
import ChartRender from './ChartRender';

const Home = () => {
  return (
    <ChartRender
      title="Table rendered from data"
      data={[{
        name: 'Test 1', value: 10,
      }, {
        name: 'Test 2', value: 12,
      }, {
        name: 'Test 3', value: 3,
      }, {
        name: 'Test 4', value: 5,
      }]}
    />
  );
};

export default Home;
