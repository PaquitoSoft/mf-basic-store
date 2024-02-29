import { useEffect, useMemo } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
  useNavigate,
} from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { TShopCart } from '@mf-basic-store/types';
import AppHeader from './app-header';

type TAppProps = {
  shopCartHook: () => { shopCart: TShopCart };
  initialPath?: string;
};
function App(props: TAppProps) {
  const navigate = useNavigate();
  const { shopCart } = props.shopCartHook();

  useEffect(() => {
    if (props.initialPath) {
      navigate(props.initialPath);
    }
  }, [navigate, props.initialPath]);

  return (
    <>
      <AppHeader shopCart={shopCart} />

      <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <Outlet />
      </div>
    </>
  );
}

type TAppShellProps = {
  routes: RouteObject[];
  shopCartHook: () => { shopCart: TShopCart };
  initialPath?: string;
};
function AppShell(props: TAppShellProps) {
  const router = useMemo(() => {
    return createBrowserRouter([
      {
        path: '/',
        element: (
          <App
            shopCartHook={props.shopCartHook}
            initialPath={props.initialPath}
          />
        ),
        children: props.routes,
      },
    ]);
  }, [props]);

  return <RouterProvider router={router} />;
}

export default AppShell;
