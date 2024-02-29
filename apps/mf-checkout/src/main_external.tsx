import * as ReactDOM from 'react-dom/client';
import { AppShell } from '@mf-basic-store/shared-ui';
import {
  ShopCartContextProvider,
  useShopCart,
} from './app/components/shop-cart-context';
import routes from './app/routes';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ShopCartContextProvider>
    <AppShell
      routes={routes}
      shopCartHook={useShopCart}
      initialPath="/shop-cart"
    />
  </ShopCartContextProvider>
);
