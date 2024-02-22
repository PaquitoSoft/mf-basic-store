import { useCallback } from 'react';
import { ItemsGrid, type TProduct } from '@mf-basic-store/shared-ui';
import useProducts from '../hooks/use-products';
import ProductListingItem from './product-listing-item';

const useShopCart = () => ({
  shopCart: {},
  addToShopCart: (itemId: number) =>
    console.log('Adding item to cart:', itemId),
});

function ProductsListingView() {
  const { products /*, loading, error */ } = useProducts();
  const { addToShopCart } = useShopCart();

  const onAddToCart = useCallback(
    (product: TProduct) => {
      addToShopCart(product.id);
    },
    [addToShopCart]
  );
  return (
    <ItemsGrid title="Catalog">
      {products.map((product: TProduct) => (
        <ProductListingItem
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </ItemsGrid>
  );
}

export default ProductsListingView;
