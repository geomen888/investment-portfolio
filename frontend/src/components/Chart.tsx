import React from 'react';
import styled from 'styled-components';

import TopPanel from './TopPanel'

interface ChartAreaProps { }

const ChartArea = styled.div<ChartAreaProps>`
  background-color: white;
  padding: .1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  grid-row: 2 / 4;

`;

const Chart: React.FC = () => {
  return (<ChartArea>
     <TopPanel />
    <h3>Investment Chart</h3>
    <p>Placeholder for chart visualization.</p>
  </ChartArea>)
}

export default Chart;