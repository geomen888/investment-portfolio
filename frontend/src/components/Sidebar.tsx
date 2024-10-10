import React from 'react';
import styled from 'styled-components';


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

const SideBar: React.FC = () => {

  const handleSimulationClick = () => {
    console.log("Simulation triggered");
  };

  return (<Sidebar>
    <h3>Candidate Companies</h3>
    <Card>Company 1</Card>
    <Card>Company 2</Card>
    <Card>Company 3</Card>
    <Card>Company 1</Card>
    <Card>Company 2</Card>
    <Card>Company 3</Card>
    <Card>Company 1</Card>
    <Card>Company 2</Card>
    <Card>Company 3</Card>
    <SimulateButton onClick={handleSimulationClick}>Trigger Simulation Mode</SimulateButton>
  </Sidebar>)

}

export default SideBar;