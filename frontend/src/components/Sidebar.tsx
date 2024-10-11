import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import DataGrid, {
  Scrolling, Pager, Paging, DataGridTypes, Editing,
} from 'devextreme-react/data-grid';

import { generateData, displayModeLabel } from './data';


interface SidebarProps {}
interface CardProps {}
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

const Card = styled.div<CardProps>`
  background: white;
  padding: 15px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
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
const data = generateData(100000);

const SideBar: React.FC = () => {
  const [displayMode, setDisplayMode] = useState<DataGridTypes.PagerDisplayMode>('full');
  const [showPageSizeSelector, setShowPageSizeSelector] = useState(true);
  const [showInfo, setShowInfo] = useState(true);
  const [showNavButtons, setShowNavButtons] = useState(true);

  const handleSimulationClick = () => {
    console.log("Simulation triggered");
  };

  return (<Sidebar>
    <DataGrid
        id='gridContainer'
        dataSource={data}
        keyExpr="id"
        showBorders={true}
        // customizeColumns={customizeColumns}
      >
        <Scrolling rowRenderingMode='virtual'></Scrolling>
        <Paging defaultPageSize={10} />
        <Editing
        mode="form"
        allowUpdating={true}
        allowAdding={true}
        allowDeleting={false} />
        <Pager
          visible={true}
          allowedPageSizes={allowedPageSizes}
          displayMode={displayMode}
          showPageSizeSelector={showPageSizeSelector}
          showInfo={showInfo}
          showNavigationButtons={showNavButtons} />
      </DataGrid>
    <SimulateButton onClick={handleSimulationClick}>Trigger Simulation Mode</SimulateButton>
  </Sidebar>)

}

export default SideBar;