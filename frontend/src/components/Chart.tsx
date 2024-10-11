import React from 'react';
import Chart, {
  Legend,
  SeriesTemplate,
  ISeriesTemplateProps,
  Title,
  Subtitle,
  CommonSeriesSettings,
  Export,
} from 'devextreme-react/chart';
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

import { dataSource } from './data2';

const customizeSeries: ISeriesTemplateProps['customizeSeries'] = (valueFromNameField: number) => (
  valueFromNameField === 2009
    ? { type: 'line', label: { visible: true }, color: '#ff3f7a' }
    : {}
);

const ChartComponent: React.FC = () => {
  return (
    <ChartArea>
    <TopPanel />
    <Chart
      id="chart"
      palette="Violet"
      dataSource={dataSource}>
      <SeriesTemplate
        nameField="year"
        customizeSeries={customizeSeries}
      />
      <CommonSeriesSettings
        argumentField="country"
        valueField="oil"
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