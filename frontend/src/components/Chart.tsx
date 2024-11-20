import React from 'react';

import Chart, {
  Legend,
  SeriesTemplate,
  Title,
  Subtitle,
  CommonSeriesSettings,
  Export,
} from 'devextreme-react/chart';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { InvestmentsState, UIState } from './../store';
import TopPanel from './TopPanel'

interface ChartAreaProps {
  checked: boolean;
}

const ChartArea = styled.div<ChartAreaProps>`
  background-color: white;
  padding: .1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  grid-row: 2 / 4;
  display: ${props => (props.checked ? `initial` : `none`)};
`;

const ChartComponent: React.FC = () => {
  const chartChecker = useSelector((state: UIState) => state.ui.cartIsVisible) || false;
  const { items = [] } = useSelector((state: InvestmentsState) => state.investments) || {};

  return (
    <ChartArea checked={chartChecker} >
      <TopPanel />
      <Chart
        id="chart"
        palette="Violet"
        dataSource={items}>
        <SeriesTemplate
          nameField="createdDate"
        // customizeSeries={customizeSeries}
        />
        <CommonSeriesSettings
          argumentField="fundingRound"
          valueField="amount"
          type="bar"
        />
        <Title text="Portfolio valuation">
          <Subtitle text="(in millions dollars)" />
        </Title>
        <Legend
          verticalAlignment="bottom"
          horizontalAlignment="center"
        />
        <Export enabled={true} />
      </Chart>
    </ChartArea>
  );
}

export default ChartComponent;
