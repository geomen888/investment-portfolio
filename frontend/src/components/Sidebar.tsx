import React from 'react';
import styled from 'styled-components';
import DataGrid, {

  Column, Scrolling, Pager, Paging, DataGridTypes, Editing,
} from 'devextreme-react/data-grid';
import { useSelector } from 'react-redux';

import { CompaniesState } from '../store'; 

interface SidebarProps {}
interface SimulateButtonProps {
  onClick: () => void;
}

const Sidebar = styled.div<SidebarProps>`
  background-color: #fafafa;
  padding: .1rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  grid-column: 1 / 2;
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

const allowedPageSizes: (DataGridTypes.PagerPageSize | number)[] = [5, 10, 'all'];
const customizeColumns = (columns: DataGridTypes.Column[]) => { columns[0].width = 70; };

const SideBar: React.FC = () => {
  const { items = [] } = useSelector((state: CompaniesState) => state.companies);

  const handleSimulationClick = () => {
    console.log('Simulation triggered');
  };

  return (<Sidebar>
     <DataGrid
        id='invested-companies'
        dataSource={items}
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
        <Column dataField="name" caption="Company Name" minWidth={300} />
        <Column dataField="investmentAdmin"/>
        <Column dataField="description" />
        <Column dataField="fundingRound" />
        <Column dataField="tags" minWidth={200} />
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
    <SimulateButton onClick={handleSimulationClick}>Trigger Simulation Mode</SimulateButton>
  </Sidebar>)

}

export default SideBar;