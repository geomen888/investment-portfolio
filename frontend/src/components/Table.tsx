import React from 'react';
import styled from 'styled-components';
import DataGrid, {
  Column,
  Scrolling, Pager, Paging, DataGridTypes,
} from 'devextreme-react/data-grid';

import { useSelector } from 'react-redux';
import { CompaniesState } from '../store'; 

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
  const { items = [] } = useSelector((state: CompaniesState) => state.companies);
    
  return (
    <InvestedCompaniesTable>
      <DataGrid
        id='invested-companies'
        dataSource={items}
        keyExpr="id"
        showBorders={true}
        customizeColumns={customizeColumns}
      >
        <Scrolling rowRenderingMode='virtual'></Scrolling>
        <Paging defaultPageSize={10} />
        <Column dataField="name" caption="Company Name" minWidth={300} />
        <Column dataField="investmentAdmin" />
        <Column dataField="description" minWidth={350}/>
        <Column dataField="fundingRound" />
        <Column dataField="tags" minWidth={200} />
        <Column dataField="valuation" />
        <Column dataField="quantityOfEmployees" caption="Quantity of employers" />
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
