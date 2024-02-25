import type { RequestHandler } from 'express';
// import type { TProduct } from '@mf-basic-store/types';
import products from '../../data/products';

export const getProductsHandler: RequestHandler = async (
  _request,
  response
) => {
  response.send({ products });
};
