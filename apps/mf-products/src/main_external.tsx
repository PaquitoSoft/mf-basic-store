import * as ReactDOM from 'react-dom/client';
import { AppShell } from '@mf-basic-store/shared-ui';
import {
  ShopCartContextProvider,
  useShopCart,
  // @ts-expect-error TODO: how to type this remote import?
} from 'mf-checkout/shop-cart-context-provider';
import routes from './app/routes';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ShopCartContextProvider>
    <AppShell routes={routes} shopCartHook={useShopCart} />
  </ShopCartContextProvider>
);
