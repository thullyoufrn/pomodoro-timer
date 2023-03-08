import styled, { css } from 'styled-components';

export type CardVariant = 'first' | 'second' | 'third';

interface CardComponentProps {
  variant: CardVariant;
}

export const CardComponent = styled.div<CardComponentProps>`
  height: 100px;
  width: 100px;
  border-radius: 8px;
  margin-bottom: 10px;

  background-color: ${props => props.theme[props.variant]};
`
