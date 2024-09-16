import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const MenuLink = styled(NavLink)`
 display: inline-block;
 text-transform: uppercase;
 border-radius: 4px;
  text-decoration: none;
  padding: 12px;
  font-family: Roboto, sans-serif;
  font-weight: 700;
  font-size: 12px;
   color: black;


  &:hover {
    color: rgb(25, 118, 210);
  }

  &.active {
    color: white;
    background-color: rgb(25, 118, 210);
  }
  
`;