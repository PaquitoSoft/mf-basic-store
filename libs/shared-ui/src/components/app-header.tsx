import { Link } from 'react-router-dom';
import type { TShopCart } from '@mf-basic-store/types';

type TAppHeaderProps = {
  shopCart: TShopCart;
};

function AppHeader(props: TAppHeaderProps) {
  return (
    <header>
      <div className="max-w-7xl mx-auto bg-slate-600 px-4 py-6 mt-4 rounded-xl">
        <div className="flex min-w-0 justify-between">
          <Link to="/">
            <h1 className="text-2xl font-bold leading-7 text-white sm:text-3xl sm:truncate">
              Basic Store
            </h1>
          </Link>
          <Link to="/shop-cart">
            <span className="text-xl font-bold leading-7 text-white sm:text-3xl sm:truncate">
              Cart ({props.shopCart.totalItems})
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
