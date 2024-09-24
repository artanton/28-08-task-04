import styled from 'styled-components';
import { Form, ErrorMessage, Field } from 'formik';

export const FormStyled = styled(Form)`
  width: "80vw";

  border: 1px solid ${p => p.theme.colors.borderGray};
  border-radius: ${p => p.theme.borderRad.norm};
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);

  padding: ${p => p.theme.padding.big};
  display: flex;
  flex-direction: column;
  gap: ${p => p.theme.gap.big};
`;

export const FieldGroup = styled.label`
  display: flex;
  flex-direction: column;
  gap: ${p => p.theme.gap.small};

  
`;

export const ErrorMessageStyled = styled(ErrorMessage)`
  padding: 0;
  color: red;
  font-size: 12px;
`;
export const FieldStyled = styled(Field)`
  min-width: 300px;
 
  border: 1px solid ${p => p.theme.colors.borderGray};
  border-radius: ${p => p.theme.borderRad.small};
  box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.2);
`;

export const Button = styled.button`
  width: 100px;
  border: 1px solid ${p => p.theme.colors.borderGray};
  border-radius: ${p => p.theme.borderRad.small};
  box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.2);

  display: flex;
  justify-content: center;
  align-items: center;
`;
