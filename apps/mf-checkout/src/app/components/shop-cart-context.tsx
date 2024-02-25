import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from 'react';
import { get, post, put, del } from '@paquitosoft/fetcher';
import { TShopCart } from '@mf-basic-store/types';

const ENDPOINT_URL = `${import.meta.env.VITE_BACKEND_HOST_URL}/api/shop-cart`;

const defaultShopCart = {
  id: -1,
  items: [],
  totalItems: 0,
  totalAmount: 0,
};

type TServerData = {
  shopCart: TShopCart;
};

type TShopCartContextData = {
  shopCart: TShopCart;
  setShopCart: Dispatch<SetStateAction<TShopCart>>;
};

const ShopCartContext = createContext<TShopCartContextData>({
  shopCart: defaultShopCart,
  setShopCart: () => false,
});

type TShopCartContextProviderProps = {
  children: ReactNode;
};
export const ShopCartContextProvider = (
  props: TShopCartContextProviderProps
) => {
  const [shopCart, setShopCart] = useState<TShopCart>(defaultShopCart);

  useEffect(() => {
    const initialize = async () => {
      const response = await get<TServerData>(ENDPOINT_URL);
      setShopCart(response.shopCart);
    };
    initialize();
  }, []);

  return (
    <ShopCartContext.Provider value={{ shopCart, setShopCart }}>
      {props.children}
    </ShopCartContext.Provider>
  );
};

export const useShopCart = () => {
  const context = useContext(ShopCartContext);

  if (!context) {
    throw new Error(
      'Using "useShopCart" requires to have the "ShopCartContextProvider" in an ancestor component.'
    );
  }

  const addToShopCart = useCallback(
    async (productId: number) => {
      const serverData = await post<TServerData>(ENDPOINT_URL, { productId });
      context.setShopCart(serverData.shopCart);
    },
    [context]
  );

  const updateInShopCart = useCallback(
    async (itemId: number, newQuantity: number) => {
      const serverData = await put<TServerData>(ENDPOINT_URL, {
        itemId,
        newQuantity,
      });
      context.setShopCart(serverData.shopCart);
    },
    [context]
  );

  const removeFromShopCart = useCallback(
    async (itemId: number) => {
      const serverData = await del<TServerData>(ENDPOINT_URL, {
        body: { itemId },
      });
      context.setShopCart(serverData.shopCart);
    },
    [context]
  );

  return {
    shopCart: context.shopCart,
    addToShopCart,
    updateInShopCart,
    removeFromShopCart,
  };
};
