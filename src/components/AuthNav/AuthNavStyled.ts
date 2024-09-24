import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const MenuLink = styled(NavLink)`
 display: inline-block;
  text-decoration: none;
  text-transform: uppercase;
  border-radius: 4px;
  font-weight: 700;
  padding: 12px;
  cursor: pointer;
  font-family: Roboto, sans-serif;
  font-size: 12px;

  &:hover {
    color: rgb(25, 118, 210);
  }
  &.active {
    color: white;
    background-color: rgb(25, 118, 210);
  }
`;
  
