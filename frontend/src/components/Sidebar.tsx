import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import DataGrid, {
  Column, Scrolling, Pager, Paging, DataGridTypes, Editing,
  Lookup
} from 'devextreme-react/data-grid';
import CustomStore from 'devextreme/data/custom_store';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, UIState } from './../store';
import { uiActions } from './../store/ui-slice';
import { companiesActions } from './../store/company-slice';
import { CompaniesState } from '../store';
import { foundingRounds, goalStatus, investmentStatus, URL } from '../common/constants';
interface SidebarProps {
  checked: boolean;
}
interface SimulateButtonProps {
  onClick: () => void;
}

const Sidebar = styled.div<SidebarProps>`
  background-color: #fafafa;
  padding: .1rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  grid-column: ${props => (props.checked ? `1 / 2` : `1 / span 2`)}; 
  grid-row: 2 / 4;
`;

const SimulateButton = styled.button<SimulateButtonProps>`
  background-color: #4CAF50;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  margin-top: 10px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const allowedPageSizes: (DataGridTypes.PagerPageSize | number)[] = [5, 10, 15];
const customizeColumns = (columns: DataGridTypes.Column[]) => { columns[0].width = 70; };

const SideBar: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { items: companies } = useSelector((state: CompaniesState) => state.companies);

  const companyItems = companies.map((company) => ({
    id: company.id,
    name: company.name,
  }));

  const companyIvestments = companies.map((company) => ({
    companyId: company.id,
    investmentsIds: company.investments.map(investment => investment.id)
  }));

  const chartChecker = useSelector((state: UIState) => state.ui.cartIsVisible) || false;
  const [companiesData] = useState(new CustomStore({
    key: 'id',
    load: () => sendRequest(`${URL}/investments`),
    insert: (payload) => sendRequest(`${URL}/investments`, 'POST', {
      ...payload,
    }).then((payload) => {
      dispatch(companiesActions.triggerUpdateStatus());
      return payload;
    }),
    update: (key, payload) => {

      const { companyId = null } = companyIvestments
        .find(company => company.investmentsIds.includes(key)) || {};

      return sendRequest(`${URL}/investments`, 'PUT', {
        id: key,
        companyId,
        ...payload,
      })
    }
  }));


  const sendRequest = useCallback(async (url: string, method = 'GET', data = {} as any) => {

    const request: RequestInit = {
      method, credentials: 'include',
    };

    if (['DELETE', 'POST', 'PUT'].includes(method)) {
      const params = Object.keys(data)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
        .join('&');

      request.body = params;
      request.headers = { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' };
    }

    const response = await fetch(url, request);

    const isJson = response.headers.get('content-type')?.includes('application/json');
    const result = isJson ? await response.json() : {};

    if (!response.ok) {
      throw result.Message;
    }

    return method === 'GET' ? result : {};
  }, []);

  const handleSimulationClick = () => {
    dispatch(uiActions.toggle());

    console.log('Chart triggered');
  };

  return (<Sidebar checked={chartChecker}>
    <DataGrid
      id='companies-candidates'
      dataSource={companiesData}
      keyExpr="id"
      showBorders={true}
      customizeColumns={customizeColumns}
    >
      <Scrolling rowRenderingMode='virtual'></Scrolling>
      <Paging defaultPageSize={10} />
      <Editing
        mode="form"
        allowUpdating={true}
        allowAdding={true}
        allowDeleting={false}
      />
      <Column dataField="companyId" caption="Company Name" minWidth={200} dataType="string" >
        <Lookup
          dataSource={companyItems}
          valueExpr="id"
          displayExpr="name"
        />
      </Column>
      <Column dataField="amount" dataType="number" />
      <Column dataField="goalStatus" >
        <Lookup
          dataSource={goalStatus}
          valueExpr="name"
          displayExpr="name"
        />
      </Column>
      <Column dataField="investmentAdmin" dataType="string" />
      <Column dataField="description" dataType="string" />
      <Column dataField="fundingRound">
        <Lookup
          dataSource={foundingRounds}
          valueExpr="name"
          displayExpr="name"
        />
      </Column>
      <Column dataField="status" >
        <Lookup
          dataSource={investmentStatus}
          valueExpr="name"
          displayExpr="name"
        />
      </Column>
      <Pager
        visible={true}
        allowedPageSizes={allowedPageSizes}
        displayMode={'full'}
        showPageSizeSelector={true}
        showInfo={true}
        showNavigationButtons={true} />
    </DataGrid>
    <SimulateButton onClick={handleSimulationClick}>Chart</SimulateButton>
  </Sidebar>)
}

export default SideBar;