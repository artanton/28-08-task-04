import styled from 'styled-components';
export const TasksList = styled.ul`
  display: flex;
  flex-direction: column;

  gap: ${p => p.theme.gap.norm};
`;
