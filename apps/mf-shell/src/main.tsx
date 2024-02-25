import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './app/app';

// @ts-expect-error TODO: how to type this remote import?
import productRoutes from 'mf-products/routes';
// @ts-expect-error TODO: how to type this remote import?
import checkoutRoutes from 'mf-checkout/routes';
// @ts-expect-error TODO: how to type this remote import?
import { ShopCartContextProvider } from 'mf-checkout/shop-cart-context-provider';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [...productRoutes, ...checkoutRoutes],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <ShopCartContextProvider>
      <RouterProvider router={router} />
    </ShopCartContextProvider>
  </StrictMode>
);
