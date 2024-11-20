import React from 'react';

import styled from 'styled-components';

import logo from '../assets/logo_converted.png'; // Import the logo image

const TopBarContainer = styled.div`
  width: 100%;
  height: 35%;
  grid-column: 1 / span 2;
  grid-row: 1 / 2;
  background-color: #f5f5f5;
  padding: .5rem 0rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin-left: 2%;
  color: #333;
  
  img {
    height: 30px;
    margin-right: 10px;
  }
`;

const NavMenu = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;

  li {
    margin: 0 15px;
    font-size: 1rem;
    color: #333;

    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
`;

const NavMenuItem = styled.li`
  position: relative;

  &:hover ul {
    display: block;
  }

  ul {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    background-color: #fff;
    list-style: none;
    padding: 5px 10px;
    border: 1px solid #ccc;
    width: 120px;
    
    li {
      padding: 5px 0;
    }
  }
`;

const TopBar: React.FC = () => {
  return (
    <TopBarContainer>
      <Logo>
        <img src={logo} alt="Contrary Logo" />
        CONTRARY
      </Logo>

      <NavMenu>
        <li>Team</li>
        <li>Companies</li>
        
        <NavMenuItem>
          Content
          <ul>
            <li>Blog</li>
            <li>News</li>
            <li>Media</li>
          </ul>
        </NavMenuItem>

        <li>Portfolio Jobs</li>
        <li>Research</li>
      </NavMenu>
    </TopBarContainer>
  );
};

export default TopBar;
