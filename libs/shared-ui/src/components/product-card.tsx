import type { ReactNode } from 'react';
import type { TProduct } from '@mf-basic-store/types';
import { Card, CardContent, CardDescription, CardFooter } from './ds/card';

type Props = {
  product: TProduct;
  children: ReactNode;
};

function ProductCard(props: Props) {
  return (
    <Card className="flex flex-col justify-between">
      <CardContent>
        <img
          className="py-8"
          src={props.product.image}
          alt={props.product.title}
        />
      </CardContent>
      <CardFooter className="flex-col items-start">
        <CardDescription>{props.product.title}</CardDescription>
        {props.children}
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
