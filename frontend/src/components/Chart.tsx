import React, { useLayoutEffect } from 'react';
import Chart, {
  Legend,
  SeriesTemplate,
  Title,
  Subtitle,
  CommonSeriesSettings,
  Export,
} from 'devextreme-react/chart';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import TopPanel from './TopPanel'
import { fetchInvestments } from './../store/investment-slice';
import { AppDispatch, InvestmentsState, UIState } from './../store';
import { RequestStatus } from '../common/enums';

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
  const dispatch: AppDispatch = useDispatch();
  const chartChecker = useSelector((state: UIState) => state.ui.cartIsVisible) || false;

  const { items = [], status } = useSelector((state: InvestmentsState) => state.investments) || {};

  useLayoutEffect(() => {
    if (status === RequestStatus.IDLE) {
      dispatch(fetchInvestments());
    }
  }, [status, dispatch]);

  return (
    <ChartArea checked={ chartChecker } >
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
