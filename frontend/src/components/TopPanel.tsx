import React from 'react';

import styled from 'styled-components';


interface TopPanelProps {
  [key: string]: unknown;
 }
interface VentureFundsInfoProps {
  [key: string]: unknown;
 }

const TopPanel = styled.div<TopPanelProps>`
  background-color: #f5f5f5;
  padding: .5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: .8rem;
`;

const VentureFundsInfo = styled.div<VentureFundsInfoProps>`
  display: flex;
  flex-direction: column;
  text-align: right;
  grid-row: 2 / 3;
`;

const TopBarPanel: React.FC = () => {
  return (<TopPanel>
    <div>Contrary Investments</div>
    <VentureFundsInfo>
      <div>Available Venture Funds: 500,000,000 USD</div>
      <div>Invested Funds: 340,000,000 USD</div>
    </VentureFundsInfo>
  </TopPanel>)

}

export default TopBarPanel;
