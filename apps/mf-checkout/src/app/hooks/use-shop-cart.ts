import { useEffect, useState } from 'react';
import { get, post, put, del } from '@paquitosoft/fetcher';
import { TShopCart } from '@mf-basic-store/types';

type ServerData = {
  shopCart: TShopCart;
};

// const ENDPOINT_URL = `${import.meta.env.VITE_BACKEND_HOST_URL}/api/shop-cart`;
const ENDPOINT_URL = `http://localhost:3333/api/shop-cart`;

console.log({
  foo: process.env.FOO,
  vite_foo: import.meta.env.VITE_FOO,
  ENDPOINT_URL: import.meta.env.VITE_BACKEND_HOST_URL,
});

const defaultShopCart = {
  id: -1,
  items: [],
  totalItems: 0,
  totalAmount: 0,
};

function useShopCart() {
  const [shopCart, setShopCart] = useState<TShopCart>(defaultShopCart);
  const [loading, setLoading] = useState(false);

  const fireRequest = async (requester: () => Promise<ServerData>) => {
    try {
      setLoading(true);
      const data = await requester();
      setShopCart(data.shopCart);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loadShopCart = () => fireRequest(() => get(ENDPOINT_URL));

  const addToShopCart = async (productId: number) => {
    fireRequest(() => post(ENDPOINT_URL, { productId }));
  };

  const updateInShopCart = (itemId: number, newQuantity: number) => {
    fireRequest(() => put(ENDPOINT_URL, { itemId, newQuantity }));
  };

  const removeFromShopCart = (itemId: number) => {
    fireRequest(() => del(ENDPOINT_URL, { body: { itemId } }));
  };

  useEffect(() => {
    if (shopCart === defaultShopCart) {
      loadShopCart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    loading,
    shopCart,
    loadShopCart,
    addToShopCart,
    updateInShopCart,
    removeFromShopCart,
  };
}

export default useShopCart;
