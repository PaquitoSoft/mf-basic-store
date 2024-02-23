import { resolve } from 'path';
import { readFile } from 'fs/promises';

const DATASOURCE_FILE_PATH = resolve('../../data/products.json');
let _products = [];

export const getProducts = async () => {
  if (!_products.length) {
    const rawData = await readFile(DATASOURCE_FILE_PATH, 'utf-8');
    _products = JSON.parse(rawData);
  }
  return _products;
};

export async function getProductsHandler(_request, response) {
  const products = await getProducts();
  response.send({ products });
}
