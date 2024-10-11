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
const URL = 'http://localhost:3000';

export enum FundingRound {
  PRE_SEED = 'PRE_SEED',
  SEED = 'SEED',
  SERIES_A = 'SERIES_A',
  SERIES_B = 'SERIES_B',
  SERIES_C = 'SERIES_C'
}
export enum Tags {
  SASS = 'SaaS',
  FINTECH = 'FinTech',
  FINANCIAL_SERVICES = 'Financial Service',
  ENTERPRICE = 'Enterprise',
  SOFTWARE_DEV = 'Software Developer',
  TOOLS_AI = 'Tools AI',
  FOOD_BEVERAGES = 'Food & Beverages',
  CONSUMER = 'Consumer',
  REAL_ESTATE = 'Real Estate',
  PAYMENTS = 'Payments',
  LOGISTICS_SUPLY_CHAIN = 'Logistics and Supply Chain',
  PRODUCTION = 'Production'
}
const tags = [{
  name: Tags.SASS,
},
{
  name: Tags.FINTECH,
},
{
  name: Tags.FINANCIAL_SERVICES,
},
{
  name: Tags.ENTERPRICE,
},
{
  name: Tags.SOFTWARE_DEV,
},
{
  name: Tags.TOOLS_AI,
},
{
  name: Tags.CONSUMER,
},
{
  name: Tags.REAL_ESTATE,
},
{
  name: Tags.CONSUMER,
},
{
  name: Tags.PAYMENTS,
}, {
  name: Tags.LOGISTICS_SUPLY_CHAIN,
}, {
  name: Tags.PRODUCTION,
}
]

const foundingRounds = [{
  name: FundingRound.PRE_SEED
},
{
  name: FundingRound.SEED
},
{
  name: FundingRound.SERIES_A
},
{
  name: FundingRound.SERIES_B
},
{
  name: FundingRound.SERIES_C
}];


const SideBar: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const chartChecker = useSelector((state: UIState) => state.ui.cartIsVisible) || false;

  const [companiesData] = useState(new CustomStore({
    key: 'id',
    load: () => sendRequest(`${URL}/companies`),
    insert: (payload) => sendRequest(`${URL}/companies`, 'POST', {
      ...payload,
     
    }),
    update: (key, values) => sendRequest(`${URL}/companies`, 'PUT', {
      key,
      values: JSON.stringify(values),
    }),
    remove: (key) => sendRequest(`${URL}/companies`, 'DELETE', {
      key,
    }),
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
        allowDeleting={false} />
      <Column dataField="name" caption="Company Name" minWidth={200} />
      <Column dataField="establishedDate" dataType="date"/>
      <Column dataField="email" />
      <Column dataField="address" />
      <Column dataField="investmentAdmin" />
      <Column dataField="description" />
      <Column dataField="fundingRound">
        <Lookup
          dataSource={foundingRounds}
          valueExpr="name"
          displayExpr="name"
        />
      </Column>
      <Column dataField="tags" minWidth={200} >
      <Lookup
          dataSource={tags}
          valueExpr="name"
          displayExpr="name"
          
        />
      </ Column >
      <Column dataField="valuation" />
      <Column dataField="verified" />
      <Column dataField="quantityOfEmployees" caption="Quantity of employers" />
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