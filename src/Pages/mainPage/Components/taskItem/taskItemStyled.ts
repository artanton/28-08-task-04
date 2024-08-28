import styled from 'styled-components';
export const TaskRow = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: '10px 0';
  width: 70vw;
  margin-bottom: 10px;
`;

export const DeleteButton = styled.button`
  background: none;
  border: none;
padding: 0 20px;
  cursor: pointer;
  /* display: flex;
  align-items: center; */
  text-align: center;
`;

export const EditButton = styled.button`
  background: none;
  border: none;
  text-align: center;
  justify-content: center;
  padding: 0 10px;

  cursor: pointer;
  /* display: flex;
  align-items: center; */
`;
export const AddSubTaskButton = styled.button`
  background: none;
  padding: 0 10px;
  border: none;
  text-align: center;
  
  cursor: pointer;

`;