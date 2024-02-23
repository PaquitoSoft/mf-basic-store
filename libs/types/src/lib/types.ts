export type TProduct = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export type TShopCartItem = {
  id: number;
  quantity: number;
  amount: number;
  product: TProduct;
};

export type TShopCart = {
  id: number;
  items: TShopCartItem[];
  totalItems: number;
  totalAmount: number;
};
