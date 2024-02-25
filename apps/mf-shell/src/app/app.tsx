import { Outlet } from 'react-router-dom';
import { AppHeader } from '@mf-basic-store/shared-ui';
// @ts-expect-error TODO: how to type this remote import?
import { useShopCart } from 'mf-checkout/shop-cart-context-provider';

function App() {
  const { shopCart } = useShopCart();

  return (
    <>
      <AppHeader shopCart={shopCart} />

      <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <Outlet />
      </div>
    </>
  );
}

export default App;
