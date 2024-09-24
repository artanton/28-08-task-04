import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const LogOutMenu = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

export const LogOutButton = styled(NavLink)`
  text-decoration: none;
  padding: 12px;
  color: black;
  cursor: pointer;
  font-family: Roboto, sans-serif;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 12px;

  &:hover {
    color: rgb(25, 118, 210);
    
  }
`;

export const UserAvatar = styled.img`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;  
  &:hover {
    
    box-shadow: rgba(0, 0, 0, 0.25) 0px 5px 5px -3px,
      rgba(0, 0, 0, 0.22) 0px 8px 10px 1px, rgba(0, 0, 0, 0.2) 0px 3px 14px 2px;
  }
`;
export const Name = styled.span`
  display: flex;
  align-items: center;
  text-decoration: none;
  font-family: Roboto, sans-serif;
  padding: 12px;
  font-size: 14px;
  font-weight: 600;
  color: black;
`;
