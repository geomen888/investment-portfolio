import React, { useState, useCallback } from 'react'



import {
  RowValidatingEvent,
} from 'devextreme/ui/data_grid';
import { ValueChangedEvent } from 'devextreme/ui/tag_box';
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
  EmailRule,
  NumericRule,
  RequiredRule,
  StringLengthRule,
  CustomRule
} from 'devextreme-react/form';
import TagBox from 'devextreme-react/tag-box';
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

import { AppDispatch } from './../store'
import { foundingRounds, tags } from '../common/constants'
import { Tags } from '../common/enums'
import { Company } from '../common/interfaces'
import { companiesActions } from './../store/company-slice'
import { customStoreRequest } from './../store/request-managment-service/apiService'
import { getCustomStore } from './../store/request-managment-service/customStoreService'

interface CompaniesTableProps {
  [key: string]: unknown;
 }

interface CellInfo {
  data: Company;
  setValue: (...args: unknown[]) => void;
}

const CompaniesTable = styled.div<CompaniesTableProps>`
 background-color: white;
 padding: 1.5rem;
 border: 1px solid #ccc;
 border-radius: 5px;
 grid-column: 1 / span 2;
 grid-row: 4 / span 2;
`

const allowedPageSizes: (DataGridTypes.PagerPageSize | number)[] = [5, 10, 15]
const customizeColumns = (columns: DataGridTypes.Column[]) => {
  columns[0].width = 70
}
const emailEditorOptions = {
  valueChangeEvent: 'keyup',
};
const TagLabel = { 'aria-label': 'Tag' };

const Table: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()

  const sendRequest = useCallback(customStoreRequest, [])
  const triggerUpdateCompanies = (payload: Company[]) => {
    dispatch(companiesActions.triggerUpdateStatus())
    return payload;
  }
  const loadFn = () => sendRequest('companies')
  const insertFn = (payload: Company) =>
    sendRequest<Company>('companies', 'POST', {
      ...payload,
    }).then(triggerUpdateCompanies)

  const updateFn = (key: string, payload: Company) => {
    payload.id = key

    return sendRequest<Company>('companies', 'PUT', { ...payload })
    .then(triggerUpdateCompanies)
  }

  const [companiesData] = useState(
    getCustomStore({
      loadFn,
      insertFn,
      updateFn,
    })
  )

  const isVerified = (e: RowValidatingEvent) => {
    if (!e.isValid) {
      e.errorText = 'You cannot save the invalid form!';
    }
  };

  const handleTagBoxChange = useCallback((e: ValueChangedEvent, rowData: CellInfo) => {
    const updatedTags = e.value;
    rowData.setValue(updatedTags);
  }, []);

  const renderTagBox = (cellInfo: CellInfo) => {
    return (
      <TagBox
        items={tags}
        valueExpr='name'
        inputAttr={TagLabel}
        displayExpr='name'
        defaultValue={cellInfo.data.tags}
        showSelectionControls={true}
        onValueChanged={(e) => handleTagBoxChange(e, cellInfo)}
        validationError={console.log}
        multiline={true}
        placeholder='Select tags'
      />
    );
  };

  return (
    <CompaniesTable>
      <DataGrid
        id='companies'
        dataSource={companiesData}
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
          dataField='name'
          caption='Company Name'
          minWidth={200}
          dataType='string'
        >
          <RequiredRule message='Company Name is required'/>
        </Column>
        <Column dataField='establishedDate' dataType='date' >
          <RequiredRule />
        </Column>
        <Column dataField='email' editorOptions={emailEditorOptions}>
          <RequiredRule message='Email is required' />
          <EmailRule message='Email is invalid' />
        </Column>
        <Column dataField='address' >
          <RequiredRule message='Address is required' />
        </Column>
        <Column dataField='investmentAdmin' dataType='string' >
          <RequiredRule message='Investment Admin is required' />
        </Column>
        <Column dataField='description' dataType='string'>
          <StringLengthRule min={10} max={200} />
        </Column>
        <Column dataField='fundingRound'>
          <Lookup
            dataSource={foundingRounds}
            valueExpr='name'
            displayExpr='name'
          />
          <RequiredRule message='Funding round is required' />
        </Column>
        <Column
          dataField="tags"
          caption="Tags"
          editCellRender={renderTagBox}
        >
          {/** validation Bug is not working, issue */}
            <CustomRule
              type='custom'
              message='At least one tag is required'
              validationCallback={(options) => {
                const { value = [] } = options as unknown as { value: Tags[] } || {}

                return value && value.length > 0;
              }}
            />
        </Column>
        <Column dataField='valuation' dataType='number'>
          <RequiredRule message='Valuation is required' />
          <NumericRule message='Valuation must be a valid number' ignoreEmptyValue={false} />
        </Column>
        <Column dataField='verified' dataType='boolean'>
        </Column>
        <Column
          dataField='quantityOfEmployees'
          caption='Quantity of employers'
          dataType='number'
        >
          <RequiredRule type='numeric' />
          <NumericRule message='Quantity of employers must be a valid number' ignoreEmptyValue={false} />
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
    </CompaniesTable>
  )
}

export default Table
