import styled from 'styled-components';

export const Header = styled.h1`
  font-size: 30px;
  padding: ${p => p.theme.padding.norm};
  text-align: center;
`;

export const TextBlock = styled.div`
  padding: ${p => p.theme.padding.norm};
  text-align: center;
`;

export const Link = styled.a`
  text-decoration: underline;
`;