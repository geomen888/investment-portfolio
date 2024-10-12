import React from 'react';
import styled from 'styled-components';

import Topbar from './TopBar';
import SideBar from './Sidebar';
import Chart from './Chart';
import Table from './Table';

interface DashboardGridProps {}

const DashboardGrid = styled.div<DashboardGridProps>`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: 2rem;
  padding: 1.5rem;
  height: 100vh;
  box-sizing: border-box;
`;

const Dashboard: React.FC = () => {
  
  return (
    <DashboardGrid>
    <Topbar />
    <SideBar  />
    <Chart />
    <Table />
    </DashboardGrid>
  );
};

export default Dashboard;
