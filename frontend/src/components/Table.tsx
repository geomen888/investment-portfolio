import React, { useLayoutEffect, useState } from 'react';
import styled from 'styled-components';

interface InvestedCompaniesTableProps { }

const InvestedCompaniesTable = styled.div<InvestedCompaniesTableProps>`
  background-color: white;
  padding: 1.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  grid-column: 1 / span 2;
  grid-row: 4 / span 2;
`;

import DataGrid, {
  Scrolling, Pager, Paging, DataGridTypes, Editing, Column
} from 'devextreme-react/data-grid';

const allowedPageSizes: (DataGridTypes.PagerPageSize | number)[] = [5, 10, 15];
const customizeColumns = (columns: DataGridTypes.Column[]) => { columns[0].width = 70; };

const Table: React.FC = () => {
  const [data, setCompanies] = useState<any[]>([]);
 
  useLayoutEffect(() => {
    const fetchCompanies = async () => {
      const responce = await fetch('http://localhost:3000/companies');

      const data = await responce.json();

      setCompanies(data);
    };

    fetchCompanies();
  }, []);

  return (
    <InvestedCompaniesTable>
      <DataGrid
        id='invested-companies'
        dataSource={data}
        keyExpr="id"
        showBorders={true}
        customizeColumns={customizeColumns}
      >
        <Scrolling rowRenderingMode='virtual'></Scrolling>
        <Paging defaultPageSize={10} />
        <Editing
          mode="form"
          allowUpdating={true}
          allowAdding={false}
          allowDeleting={false} />
        <Column dataField="name" caption="Company Name" minWidth={300}/>
        <Column dataField="investmentAdmin" />
        <Column dataField="description" />
        <Column dataField="fundingRound" />
        <Column dataField="tags" minWidth={200} />
        <Column dataField="valuation" />
        <Column dataField="verified" />
        <Column dataField="quantityOfEmployees" caption="Quantity of employers"/>
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
