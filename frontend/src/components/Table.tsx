import React from 'react';
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

const Table: React.FC = () => {
  return (<InvestedCompaniesTable>
    <h3>Companies Already Invested</h3>
    <p>Placeholder for invested companies table with pagination.</p>
  </InvestedCompaniesTable>)
}

export default Table;
