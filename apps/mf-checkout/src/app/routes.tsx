import { Suspense, lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { v4 } from 'uuid';

// Since we're using TailwindCSS and every frontend has its own
// subset of classes used across their components, we need to
// somehow make the host application use the right TW styles
// for this application. Otherwise, the host application might
// no be using some classes this frontend uses so the components
// of this application will be unstyled when rendered in the host
import '../styles.css';

const ShopCartView = lazy(() => import('./components/shop-cart-view'));

// We need to wrap lazy components with a Suspense,
// otherwise client-side navigation fails in the host.
// I don't understand why. Maybe that's something that
// can be addressed over there
const AsyncComponent = () => (
  <Suspense fallback="Loading...">
    <ShopCartView />
  </Suspense>
);

const routes: RouteObject[] = [
  {
    id: v4(),
    path: 'shop-cart',
    element: <AsyncComponent />,
  },
];

export default routes;
