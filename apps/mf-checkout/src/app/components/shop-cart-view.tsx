import { ItemsGrid } from '@mf-basic-store/shared-ui';
import ShopCartItem from './shop-cart-item';
import { useShopCart } from './shop-cart-context';

function ShopCartView() {
  const { shopCart, updateInShopCart, removeFromShopCart } = useShopCart();

  return (
    <ItemsGrid title="ShopCart">
      {shopCart.items.map((item) => (
        <ShopCartItem
          key={item.id}
          item={item}
          onQuantityChange={updateInShopCart}
          onRemove={removeFromShopCart}
        />
      ))}
    </ItemsGrid>
  );
}

export default ShopCartView;
