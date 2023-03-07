import styled, { css } from 'styled-components';

export type CardVariant = 'first' | 'second' | 'third';

interface CardComponentProps {
  variant: CardVariant;
}

const divVariants = {
  first: "yellow",
  second: "green",
  third: "orange",
}

export const CardComponent = styled.div<CardComponentProps>`
  height: 100px;
  width: 100px;
  border-radius: 8px;
  margin-bottom: 10px;

  ${props => {
    return css`
      background-color: ${divVariants[props.variant]};
    `
  }}
`