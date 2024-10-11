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
import { tags, foundingRounds, URL } from '../common/constants';
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

  const chartChecker = useSelector((state: UIState) => state.ui.cartIsVisible) || false;
  const [isEdit, setIsEdit] = useState(false);
  const [companiesData] = useState(new CustomStore({
    key: 'id',
    load: () => sendRequest(`${URL}/companies`),
    insert: (payload) => sendRequest(`${URL}/companies`, 'POST', {
      ...payload,
    }),
    update: (key, payload) => sendRequest(`${URL}/companies`, 'PUT', {
      id: key,
      ...payload,
    })
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

  const onEditingStart = () => {
    setIsEdit(true);
  }

  const onEditingEnd = () => {
    setIsEdit(false);
  }

  return (<Sidebar checked={chartChecker}>
    <DataGrid
      id='companies-candidates'
      dataSource={companiesData}
      keyExpr="id"
      showBorders={true}
      onEditCanceled={onEditingEnd}
      onSaving={onEditingEnd}
      onEditorPreparing={onEditingStart}
      customizeColumns={customizeColumns}

    >
      <Scrolling rowRenderingMode='virtual'></Scrolling>
      <Paging defaultPageSize={10} />
      <Editing
        mode="form"
        allowUpdating={true}
        allowAdding={true}
        allowDeleting={false} />
      <Column dataField="name" caption="Company Name" minWidth={200} dataType="string" />
      <Column dataField="establishedDate" dataType="date" />
      <Column dataField="email" dataType="string" />
      <Column dataField="address" />
      <Column dataField="investmentAdmin" dataType="string" />
      <Column dataField="description" dataType="string" />
      <Column dataField="fundingRound">
        <Lookup
          dataSource={foundingRounds}
          valueExpr="name"
          displayExpr="name"
        />
      </Column>
      { isEdit ? <Column dataField="tags" minWidth={200} >
        <Lookup
          dataSource={tags}
          valueExpr="name"
          displayExpr="name"
        />
      </Column>
        : <Column dataField="tags" minWidth={200} />
      }
      <Column dataField="valuation" dataType="number" />
      <Column dataField="verified" dataType="boolean" />
      <Column dataField="quantityOfEmployees" caption="Quantity of employers" dataType="number" />
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