import styled from 'styled-components';
import { Form, ErrorMessage, Field } from 'formik';

export const FormStyled = styled(Form)`
  

  padding: ${p => p.theme.padding.huge};
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: ${p => p.theme.gap.norm};
`;

export const FieldGroup = styled.label`
  display: flex;
  font-family: Roboto, sans-serif;
  font-size: 14px;
  flex-direction: column;
  gap: ${p => p.theme.gap.small};
  position: relative;
`;

export const ErrorMessageStyled = styled(ErrorMessage)`
  padding: 0;
  color: red;
  font-size: 12px;
  position: absolute;
  left: 10px;
  top: 105%;
`;
export const FieldStyled = styled(Field)`
  min-width: 200px;
  padding: ${p => p.theme.padding.small};
  font-size: 0.875rem;
  border: 1px solid ${p => p.theme.colors.borderGray};
  border-radius: ${p => p.theme.borderRad.small};
  box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.2);
`;

export const IconButton = styled.button`
  display: flex;
  position: absolute;
  right: 4px;
  top: 55%;
  border: none;
  background-color: transparent;
  align-items: center;
  color: rgb(25, 118, 210);
`;

export const Button = styled.button`
  display: inline-flex;
  margin-top: 12px;
  align-items: center;

  justify-content: center;
  position: relative;
  box-sizing: border-box;
  cursor: pointer;
  vertical-align: middle;
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.75;
  letter-spacing: 0.02857em;
  text-transform: uppercase;
  min-width: 64px;
  color: rgb(255, 255, 255);
  background-color: rgb(25, 118, 210);
  box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
    rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
  outline: 0px;
  border-width: 0px;
  padding: 6px 16px;
  border-radius: 4px;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1),
    border-color 250ms cubic-bezier(0.4, 0, 0.2, 1),
    color 250ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background-color: rgb(21, 101, 192);
    box-shadow: rgba(0, 0, 0, 0.25) 0px 5px 5px -3px,
      rgba(0, 0, 0, 0.22) 0px 8px 10px 1px, rgba(0, 0, 0, 0.2) 0px 3px 14px 2px;
  }
`;
