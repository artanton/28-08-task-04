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
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
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
