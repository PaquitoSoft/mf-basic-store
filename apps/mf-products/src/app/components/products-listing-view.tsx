import { useCallback } from 'react';
import { ItemsGrid } from '@mf-basic-store/shared-ui';
import type { TProduct } from '@mf-basic-store/types';
// @ts-expect-error TODO: how to type this remote import?
import { useShopCart } from 'mf-checkout/shop-cart-context-provider';
import useProducts from '../hooks/use-products';
import ProductListingItem from './product-listing-item';

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
