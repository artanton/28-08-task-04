import styled from 'styled-components';

export const DrawlerBtn = styled.div`
  padding: 100px;
`;

export const Loader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: ${p => p.theme.colors.black};
  max-width: 1000px;
  margin: 0 auto;
`;
