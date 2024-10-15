import React from 'react';
import styled from 'styled-components';

import Topbar from './TopBar';
import InvesstmentsTable from './InvestmentsTable';
import Chart from './Chart';
import CompaniesTable from './CompaniesTable';

interface DashboardGridProps { }

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
      <InvesstmentsTable />
      <Chart />
      <CompaniesTable />
    </DashboardGrid>
  );
};

export default Dashboard;
