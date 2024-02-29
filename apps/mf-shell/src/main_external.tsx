import * as ReactDOM from 'react-dom/client';
import { AppShell } from '@mf-basic-store/shared-ui';

// @ts-expect-error TODO: how to type this remote import?
import productRoutes from 'mf-products/routes';
// @ts-expect-error TODO: how to type this remote import?
import checkoutRoutes from 'mf-checkout/routes';
import {
  ShopCartContextProvider,
  useShopCart,
  // @ts-expect-error TODO: how to type this remote import?
} from 'mf-checkout/shop-cart-context-provider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ShopCartContextProvider>
    <AppShell
      routes={[...productRoutes, ...checkoutRoutes]}
      shopCartHook={useShopCart}
    />
  </ShopCartContextProvider>
);
