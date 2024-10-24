import React, { useLayoutEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux'

import Topbar from './TopBar';
import InvesstmentsTable from './InvestmentsTable';
import Chart from './Chart';
import CompaniesTable from './CompaniesTable';

import { AppDispatch, CompaniesState, InvestmentsState } from './../store';
import { RequestStatus  } from './../common/enums';
import { fetchCompanies, companiesActions  } from './../store/company-slice';
import { fetchInvestments } from './../store/investment-slice';

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

  const dispatch: AppDispatch = useDispatch();

  const { status: companyStatus, updateApiTrigger } = useSelector((state: CompaniesState) => state.companies);
  const { status: investmentsStatus } = useSelector((state: InvestmentsState) => state.investments) || {};

  useLayoutEffect(() => {
    
    if (companyStatus === RequestStatus.IDLE) {
      dispatch(fetchCompanies());
    }

    if (investmentsStatus === RequestStatus.IDLE) {
      dispatch(fetchInvestments());
    }

    if (updateApiTrigger) {
      dispatch(fetchCompanies());
      dispatch(companiesActions.triggerUpdateStatus());
    } 

  }, [companyStatus, investmentsStatus, updateApiTrigger, dispatch]);

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
