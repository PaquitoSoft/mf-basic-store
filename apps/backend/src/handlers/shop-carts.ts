// import { resolve } from 'path';
// import { readFile, writeFile } from 'fs/promises';
import type { TShopCart } from '@mf-basic-store/types';
import { RequestHandler } from 'express';
import products from '../../data/products';
import { badRequest } from '@hapi/boom';

// --------------- BEGIN: Helper functions ---------------
// const DATASOURCE_FILE_PATH = resolve(
//   import.meta.url,
//   '../../data/shop-cart.json'
// );
// async function readShopCart(): Promise<TShopCart> {
//   const data = await readFile(DATASOURCE_FILE_PATH, 'utf8');
//   return JSON.parse(data);
// }
// async function writeShopCart(shopCart: TShopCart): Promise<TShopCart> {
//   const totals = shopCart.items.reduce(
//     (acc, item) => {
//       acc.items += item.quantity;
//       acc.amount += item.quantity * item.product.price;
//       return acc;
//     },
//     { items: 0, amount: 0 }
//   );
//   shopCart.totalItems = totals.items;
//   shopCart.totalAmount = totals.amount;
//   await writeFile(DATASOURCE_FILE_PATH, JSON.stringify(shopCart));
//   return shopCart;
// }
let _shopCart: TShopCart = {
  id: Date.now(),
  items: [],
  totalItems: 0,
  totalAmount: 0,
};
const readShopCart = () => _shopCart;
async function writeShopCart(shopCart: TShopCart): Promise<TShopCart> {
  const totals = shopCart.items.reduce(
    (acc, item) => {
      acc.items += item.quantity;
      acc.amount += item.quantity * item.product.price;
      return acc;
    },
    { items: 0, amount: 0 }
  );
  shopCart.totalItems = totals.items;
  shopCart.totalAmount = totals.amount;
  _shopCart = shopCart;
  return shopCart;
}
// --------------- END: Helper functions ---------------

export const getCartHandler: RequestHandler = async (_request, response) => {
  const shopCart = await readShopCart();
  response.status(200).json({ shopCart });
};

export const addToCartHandler: RequestHandler = async (request, response) => {
  const { productId } = request.body;
  const shopCart = await readShopCart();
  const product = products.find((p) => p.id === Number(productId));
  const shopCartItem = shopCart.items.find(
    (item) => item.product.id === Number(productId)
  );

  if (!shopCartItem) {
    shopCart.items.push({
      id: Date.now(),
      quantity: 1,
      amount: product.price,
      product,
    });
  } else {
    shopCartItem.quantity += 1;
    shopCartItem.amount += shopCartItem.product.price;
  }

  await writeShopCart(shopCart);

  response.status(200).json({ shopCart });
};

export const updateInCartHandler: RequestHandler = async (
  request,
  response
) => {
  const { itemId, newQuantity } = request.body;
  const shopCart = await readShopCart();
  const item = shopCart.items.find((item) => item.id === Number(itemId));

  if (!item) {
    return badRequest('Invalid shop-cart item ID');
  }

  item.quantity = newQuantity;
  item.amount = newQuantity * item.product.price;

  await writeShopCart(shopCart);

  response.status(200).json({ shopCart });
};

export const removeFromToCartHandler: RequestHandler = async (
  request,
  response
) => {
  const { itemId } = request.body;
  const shopCart = await readShopCart();
  const itemIndex = shopCart.items.findIndex(
    (item) => item.id === Number(itemId)
  );

  if (itemIndex === -1) {
    return badRequest('Invalid shop-cart item ID');
  }

  shopCart.items.splice(itemIndex, 1);

  await writeShopCart(shopCart);

  response.status(200).json({ shopCart });
};
