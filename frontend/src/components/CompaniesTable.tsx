import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import DataGrid, {
  Column,
  Scrolling, Pager, Paging, DataGridTypes, Editing, Lookup
} from 'devextreme-react/data-grid';
import { useDispatch } from 'react-redux';
import CustomStore from 'devextreme/data/custom_store';
import { AppDispatch } from './../store';
import { companiesActions } from './../store/company-slice';


import { foundingRounds, URL } from '../common/constants';

interface InvestedCompaniesTableProps {};

const InvestedCompaniesTable = styled.div<InvestedCompaniesTableProps>`
  background-color: white;
  padding: 1.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  grid-column: 1 / span 2;
  grid-row: 4 / span 2;
`;

const allowedPageSizes: (DataGridTypes.PagerPageSize | number)[] = [5, 10, 15];
const customizeColumns = (columns: DataGridTypes.Column[]) => { columns[0].width = 70; };

const Table: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const [companiesData] = useState(new CustomStore({
    key: 'id',
    load: () => sendRequest(`${URL}/companies`),
    insert: (payload) => sendRequest(`${URL}/companies`, 'POST', {
      ...payload,
    })
    .then((payload) => {
      dispatch(companiesActions.triggerUpdateStatus());
      return payload;
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

    
  return (
    <InvestedCompaniesTable>
      <DataGrid
      id='companies'
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
      <Column dataField="tags" minWidth={200} allowEditing={false} editorOptions={{ visible: false }} />
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
    </InvestedCompaniesTable>
  );
};

export default Table;
