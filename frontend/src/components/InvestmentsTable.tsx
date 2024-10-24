import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import DataGrid, {
  Column,
  Scrolling,
  Pager,
  Paging,
  DataGridTypes,
  Editing,
  Lookup,
} from 'devextreme-react/data-grid'

import {
  RowValidatingEvent,
} from 'devextreme/ui/data_grid';

import {
  NumericRule,
  RequiredRule,
  StringLengthRule,
} from 'devextreme-react/form';

import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, UIState } from './../store'
import { uiActions } from './../store/ui-slice'
import { getCustomStore } from './../store/request-managment-service/customStoreService'
import { companiesActions } from './../store/company-slice'
import { CompaniesState } from '../store'
import { customStoreRequest } from '../store/request-managment-service/apiService'
import { Investment } from '../common/interfaces'

import {
  foundingRounds,
  goalStatus,
  investmentStatus,
} from '../common/constants'
interface InvestmenstLeftProps {
  checked: boolean
}
interface ChartButtonProps {
  onClick: () => void
}

const InvestmenstLeftSide = styled.div<InvestmenstLeftProps>`
 background-color: #fafafa;
 padding: 0.1rem;
 display: flex;
 flex-direction: row;
 flex-wrap: wrap;
 grid-column: ${(props) => (props.checked ? `1 / 2` : `1 / span 2`)};
 grid-row: 2 / 4;
`

const ChartButton = styled.button<ChartButtonProps>`
 background-color: #4caf50;
 color: white;
 padding: 10px;
 border: none;
 border-radius: 5px;
 margin-top: 10px;
 cursor: pointer;

 &:hover {
  background-color: #45a049;
 }
`

const allowedPageSizes: (DataGridTypes.PagerPageSize | number)[] = [5, 10, 15]
const customizeColumns = (columns: DataGridTypes.Column[]) => {
  columns[0].width = 70
}

const Investments: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { items: companies } = useSelector(
    (state: CompaniesState) => state.companies
  );

  const companyItems = companies.map((company) => ({
    id: company.id,
    name: company.name,
  }));

  const companyIvestments = companies.map((company) => ({
    companyId: company.id,
    investmentsIds: company.investments.map((investment) => investment.id),
  }));
  const sendRequest = useCallback(customStoreRequest, []);

  const loadFn = () => sendRequest<Investment>('investments');
  const insertFn = (payload: Investment) =>
    sendRequest<Investment>('investments', 'POST', {
      ...payload,
    }).then((payload) => {
      dispatch(companiesActions.triggerUpdateStatus());

      return payload;
    })

  const updateFn = (key: string, payload: Investment) => {
    const { companyId = null } =
      companyIvestments.find((company) => company.investmentsIds.includes(key)) ||
      {}

    payload.id = key;

    return sendRequest<Investment>('investments', 'PUT', {
      companyId,
      ...payload,
    });
  }

  const [investmentsData] = useState(
    getCustomStore({
      loadFn,
      insertFn,
      updateFn,
    })
  );

  const isVerified = (e: RowValidatingEvent) => {
    if (!e.isValid) {
      e.errorText = 'You cannot save the invalid form!';
    }
  };

  const chartChecker =
    useSelector((state: UIState) => state.ui.cartIsVisible) || false

  const handleSimulationClick = () => {
    dispatch(uiActions.toggle())

    console.log('Chart triggered')
  }

  return (
    <InvestmenstLeftSide checked={chartChecker}>
      <DataGrid
        id='investments'
        dataSource={investmentsData}
        keyExpr='id'
        showBorders={true}
        onRowValidating={isVerified}
        customizeColumns={customizeColumns}
      >
        <Scrolling rowRenderingMode='virtual' />
        <Paging defaultPageSize={10} />
        <Editing
          mode='form'
          allowUpdating={true}
          allowAdding={true}
          allowDeleting={false}
        />
        <Column
          dataField='companyId'
          caption='Company Name'
          minWidth={200}
          dataType='string'
        >
          <Lookup dataSource={companyItems} valueExpr='id' displayExpr='name' />
          <RequiredRule message='Company Name is required' />
        </Column>
        <Column dataField='amount' dataType='number'>
          <RequiredRule message='Amount is required' />
          <NumericRule message='Amount must be a valid number' ignoreEmptyValue={false} />

        </Column>
        <Column dataField='goalStatus'>
          <Lookup dataSource={goalStatus} valueExpr='name' displayExpr='name' />
          <RequiredRule message='Goal Status is required' />
        </Column>
        <Column dataField='investmentAdmin' dataType='string'>
          <RequiredRule message='Investment Admin is required' />
        </Column>
        <Column dataField='description' dataType='string'>
          <StringLengthRule min={10} max={200} />
        </Column>
        <Column dataField='fundingRound'>
          <Lookup dataSource={foundingRounds} valueExpr='name' displayExpr='name' />
          <RequiredRule message='Funding round is required' />

        </Column>
        <Column dataField='status'>
          <Lookup
            dataSource={investmentStatus}
            valueExpr='name'
            displayExpr='name'
          />
          <RequiredRule message='Status is required' />

        </Column>
        <Pager
          visible={true}
          allowedPageSizes={allowedPageSizes}
          displayMode={'full'}
          showPageSizeSelector={true}
          showInfo={true}
          showNavigationButtons={true}
        />
      </DataGrid>
      <ChartButton onClick={handleSimulationClick}>Chart</ChartButton>
    </InvestmenstLeftSide>
  )
}

export default Investments
