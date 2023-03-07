import { CardComponent, CardVariant } from "./Card.styles";

interface CardProps {
  variant?: CardVariant;
}

export function Card({ variant = 'first' }: CardProps) {
  return <CardComponent variant={variant}/>
}
