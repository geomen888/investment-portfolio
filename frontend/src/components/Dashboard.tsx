import React from 'react';
import styled from 'styled-components';

import Topbar from './TopBar';
import TopPanel from './TopPanel';
import SideBar from './Sidebar';
import Chart from './Chart';
import Table from './Table';

interface DashboardGridProps {}

const DashboardGrid = styled.div<DashboardGridProps>`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: auto 6(1fr);
  grid-gap: 20px;
  padding: 20px;
  height: 100vh;
  box-sizing: border-box;
`;

const Dashboard: React.FC = () => {
  
  return (
    <DashboardGrid>
    <Topbar />
    <TopPanel />
    <SideBar />
    <Chart />
    <Table />
    </DashboardGrid>
  );
};

export default Dashboard;
